<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
use App\Rules\Base64;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use App\Models\Company;
// use App\Models\Documents;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CompanyController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    function createRegisId(Request $request)
    {
        try {
            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
                "data" => [],
            ], 401);
            $decoded = $jwt->decoded;
            $regisId = Str::uuid()->toString();

            DB::table("dev_run_regis_id")->insert([
                "regis_id" => $regisId,
                "creator_id" => $decoded->account_id,
            ]);

            DB::table("dev_documents")->insert([
                "regis_id" => $regisId,
                // "folder_name" => $regisId,
                "documents" => '{"anti_corruption_policy":"","vat_license":"","business_registration":"","fi_statement":"","invoice":"","organization_chart":"","sale_contract":"","factory_visit":"","machine_condition":"","company_map":"","other_document1":"","other_document2":"","other_document3":""}',
            ]);

            return response()->json([
                "status" => "success",
                "message" => "Created regis id successfully",
                "data" => [
                    ["regis_id" => $regisId]
                ],
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    function testPost(Request $request)
    {
        $rules = [
            'regis_id' => ["required", "string"],
            'doc_name' => ["required", "string"],
            // 'content' => ["required", new Base64],
            'content' => ["required", "string"],
        ];
        $validator = Validator::make($request->all(), $rules);

        return response()->json($request->all());
    }

    function uploadDocument(Request $request)
    {
        try {
            // $header = $request->header('Authorization');
            // $jwt = $this->jwtUtils->verifyToken($header);
            // if (!$jwt->state) return response()->json([
            //     "status" => "error",
            //     "message" => "Unauthorized",
            //     "data" => [],
            // ], 401);
            // $decoded = $jwt->decoded;
            // $regisId = Str::uuid()->toString();

            // DB::table("dev_run_regis_id")->insert([
            //     "regis_id" => $regisId,
            //     "creator_id" => $decoded->user_id,
            // ]);

            // return response()->json($request->all());

            // return response()->json([
            //     "status" => "error",
            //     "message" => "Test",
            //     "data" => [["request" => $request->all()]]
            // ], 400);

            $docNames = [
                'anti_corruption_policy',
                'vat_license',
                'business_registration',
                'fi_statement',
                'invoice',
                'organization_chart',
                'sale_contract',
                'factory_visit',
                'machine_condition',
                'company_map',
                'other_document1',
                'other_document2',
                'other_document3'
            ];


            //! regis_id
            //! doc_name
            //! pdf file (base64)
            $rules = [
                'regis_id' => ["required", "string"],
                'doc_name' => ["required", "string"],
                'content' => ["required", "min:500", new Base64],
                // 'content' => ["required", "string"],
            ];
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    "status" => "error",
                    "message" => "Bad request",
                    "data" => [
                        [
                            "validator" => $validator->errors()
                        ]
                    ]
                ], 400);
            }


            $regisId = $validator->validated()["regis_id"];
            $docName = $validator->validated()["doc_name"];

            if (!\in_array($docName, $docNames)) {
                return response()->json([
                    "status" => "error",
                    "message" => "Bad request",
                    "data" => [
                        ["validator" => "doc_name ($docName) does not match."]
                    ]
                ], 400);
            }

            // return response()->json($request->all());

            $fileName = "documents->>'" . $docName . "'";

            $result = DB::table("dev_documents")->selectRaw("document_id, folder_name, $fileName as path_name")->where(["regis_id" => $regisId])->take(1)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "regis_id does not exists",
                "data" => []
            ], 400);

            //! "a880b888-bf4b-4b77-8c20-936804fc2750"

            $path = \getcwd() . "\\..\\..\\docs\\pdf\\";
            if (!\is_dir($path)) \mkdir($path, 0777, true);

            // $genFilename = $this->randomName(5) . time() . ".txt";
            $genFilename = $this->randomName(5) . time() . ".pdf";

            $folderPath = $path . $regisId . "\\";
            if (!\is_dir($folderPath)) \mkdir($folderPath, 0777, true);

            $pathOfNewFile = $folderPath . $genFilename;
            $pathOfOldFile = $folderPath . $result[0]->path_name;
            if (\file_exists($pathOfOldFile) && \strlen($result[0]->path_name) != 0) \unlink($pathOfOldFile);

            // \file_put_contents($pathOfNewFile, $validator->validated()["content"]);
            $base64 = \trim($validator->validated()["content"], "data:application/pdf;base64,");
            \file_put_contents($pathOfNewFile, \base64_decode($base64));

            // $data = ["documents->$docName" => $genFilename];
            // if (\is_null($result[0]->folder_name)) $data["folder_name"] = $regisId;

            DB::table("dev_documents")->where(["document_id" => $result[0]->document_id])->update([
                "folder_name" => $regisId,
                "documents->$docName" => $genFilename,
            ]);

            return response()->json([
                "status" => "success",
                "message" => "Upload file successfully",
                "data" => [],
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }


    //!random Name
    private function randomName(int $length = 10)
    {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_';
        $pass = array(); //remember to declare $pass as an array
        $alphaLength = \strlen($alphabet) - 1; //put the length -1 in cache
        for ($i = 0; $i < $length; $i++) {
            $n = \rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return \implode($pass); //turn the array into a string
    }

    //!Add Company
    function addCompany(Request $request)
    {
        try {
            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
                "data" => [],
            ], 401);
            // $decoded = $jwt->decoded;

            // \date_default_timezone_set('Asia/Bangkok');
            // $now = new \DateTime();
            // $datetime = date('Y-m-d H:i:s');
            // $path = \getcwd() . "\\..\\..\\docs\\pdf\\";


            $rules = [
                'regis_id' => 'required|string',
                'company_information.company_admin' => 'required|string',
                'company_information.company_name' => 'required|string',
                'company_information.address' => 'required|string',
                'company_information.country' => 'required|string',
                'company_information.province' => 'required|string',
                'company_information.district' => 'required|string',
                'company_information.sub_district' => 'required|string',
                'company_information.zip_code' => 'required|string',
                'company_information.phone_number' => 'required|string',
                'company_information.juristic_id' => 'required|string',
                'company_information.website' => 'required|string|url',
                'company_information.nature_of_business' => 'required|string',
                'company_information.company_registration.is_thai_registration' => 'required|boolean',
                'company_information.company_registration.registration_country' => 'required|string',

                'share_holder.hight_nationalities.nationalities' => 'required|string',
                'share_holder.hight_nationalities.percentage' => 'required|integer|min:0|max:100',
                'share_holder.thai_nationalities' => 'required|integer|min:0|max:100',
                'share_holder.other_nationalities' => 'required|integer|min:0|max:100',

                'contact_person.*.position_th' => 'required|string',
                'contact_person.*.position_en' => 'required|string',
                'contact_person.*.name' => 'required|string',
                'contact_person.*.tel' => 'required|string',
                'contact_person.*.email' => 'required|email',

                'relationship.is_relationship' => 'required|boolean',
                'relationship.relationship_name' => 'required_if:relationship.is_relationship,true|string',

                'standard.certificate.*.label_th' => 'required|string',
                'standard.certificate.*.label_en' => 'required|string',
                'standard.certificate.*.is_checked' => 'required|boolean',
                'standard.certificate.*.value' => 'required|string',
                'standard.certificate.*.exp' => 'required|string',
                'standard.benefit.*.label_th' => 'required|string',
                'standard.benefit.*.label_en' => 'required|string',
                'standard.benefit.*.is_checked' => 'required|boolean',
                'standard.benefit.*.value' => 'required|string',
                'standard.benefit.*.exp' => 'required|string',

                'payment_term.credit_term.name' => 'required|string',
                'payment_term.credit_term.value' => 'required|integer',
                'payment_term.billing_term.name' => 'required|string',
                'payment_term.billing_term.value' => 'required|string',
                'payment_term.currency' => 'required|string',
                'payment_term.incoterm' => 'required|string',
                'payment_term.LC_term.is_LC' => 'required|boolean',
                'payment_term.LC_term.LC_type' => 'required|string',
                'payment_term.delivery_term.*.label_th' => 'required|string',
                'payment_term.delivery_term.*.label_en' => 'required|string',
                'payment_term.delivery_term.*.is_checked' => 'required|boolean',
                'payment_term.deposit_term.is_deposit' => 'required|boolean',
                'payment_term.deposit_term.deposit_type' => 'required|string',
                'payment_term.product_warranty.is_warranty' => 'required|boolean',
                'payment_term.product_warranty.value' => 'required|string',
                'payment_term.company_policy.*.label_th' => 'required|string',
                'payment_term.company_policy.*.label_en' => 'required|string',
                'payment_term.company_policy.*.is_checked' => 'required|boolean',
                'payment_term.objective_purchasing.name' => 'required|string',
                'payment_term.objective_purchasing.value' => 'required|string',
                'payment_term.main_customer.name' => 'required|string',
                'payment_term.main_customer.value' => 'required|string',
            ];


            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json([
                    "status" => "error",
                    "message" => "Bad request",
                    "data" => [
                        [
                            "validator" => $validator->errors()
                        ]
                    ]
                ], 400);
            }

            $company_information = json_encode($request->company_information);
            $share_holder = json_encode($request->share_holder);
            $contact_person = json_encode($request->contact_person);
            $standard = json_encode($request->standard);
            $relationship = json_encode($request->relationship);
            $payment_term = json_encode($request->payment_term);

            // $result = Company::insert([
            $result = DB::table("dev_company_informations")->insert([
                "company_information"   => $company_information,
                "share_holder"          => $share_holder,
                "contact_person"        => $contact_person,
                "standard"              => $standard,
                "relationship"          => $relationship,
                "payment_term"          => $payment_term,
            ]);

            return response()->json([
                "status" => 'success',
                "message" => "Added company successfully",
                "data" => [
                    [
                        "result" => $result
                    ]
                ],
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //!company_list
    function companyList(Request $request)
    {
        try {
            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
                "data" => [],
            ], 401);
            // $validators = Validator::make(
            $request->all();
            //     [
            //         'username' => 'required|string',
            //         'password' => 'required|string|min:1|max:255',
            //     ]
            // );

            // if ($validators->fails()) {
            //     return response()->json([
            //         "status" => "error",
            //         "message" => "Bad request",
            //         "data" => [
            //             [
            //                 "validator" => $validators->errors()
            //             ]
            //         ]
            //     ], 400);
            // }

            $data = DB::table("dev_company_list")->take(1)->get();
            if (\count($data) == 0) return response()->json([
                "status" => "error",
                "message" => "There is no data company in the iCRS system",
                "data" => []
            ]);

            return response()->json([
                "status" => "success",
                "message" => "data output success",
                "data" => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ], 500);
        }
    }

    //!business_type
    function businessType(Request $request)
    {
        try {
            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
                "data" => [],
            ], 401);

            $request->all();

            $data = DB::table("dev_business_type")->get();
            if (\count($data) == 0) return response()->json([
                "status" => "error",
                "message" => "There is no data business type in the iCRS system",
                "data" => []
            ]);

            return response()->json([
                "status" => "success",
                "message" => "data output success",
                "data" => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ], 500);
        }
    }

    //!business_type
    function countryAmount(Request $request)
    {
        try {

            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
                "data" => [],
            ], 401);

            $request->all();

            $data = DB::table("dev_country")->get();
            if (\count($data) == 0) return response()->json([
                "status" => "error",
                "message" => "There is no data country in the iCRS system",
                "data" => []
            ]);

            return response()->json([
                "status" => "success",
                "message" => "data output success",
                "data" => [
                    "data" => $data
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ], 500);
        }
    }
}
