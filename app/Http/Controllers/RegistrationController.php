<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Libraries\JWT\JWTUtils;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Rules\Base64;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\Rule;

// define("DOCS_BASE_PATH", "http://10.1.8.94:8081/dev/iCRS-ACC-All/docs/pdf/");
define("DOCS_BASE_PATH", "https://snc-services.sncformer.com/dev/icrs/docs/pdf/");

class RegistrationController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

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

    //! Block Role OK
    //TODO [POST] /registration/create-regis-id
    function createRegisID(Request $request)
    {
        try {
            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "ไม่ได้รับอนุญาต",
                "data" => [],
            ], 401);
            $decoded = $jwt->decoded;

            //! Block by role
            if (!\in_array($decoded->role, ['admin', 'user'])) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สิทธิ์ในการใช้งานไม่ถูกต้อง)",
                "data" => [],
            ], 401);
            //! ./Block by role

            $regisId = Str::uuid()->toString();

            DB::table("tb_run_registrations")->insert([
                "regis_id" => $regisId,
                "creator_id" => $decoded->user_id,
            ]);

            DB::table("tb_regis_documents")->insert([
                "regis_id" => $regisId,
                // "folder_name" => $regisId,
                // "documents" => '{"anti_corruption_policy":"","vat_license":"","business_registration":"","fi_statement":"","invoice":"","organization_chart":"","sale_contract":"","factory_visit":"","machine_condition":"","company_map":"","other_document1":"","other_document2":"","other_document3":""}',
            ]);

            return response()->json([
                "status" => "success",
                "message" => "สร้างการลงทะเบียนสำเร็จ",
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

    //! Block Role OK
    //? [PATCH] /registration/upload-document
    function uploadDocument(Request $request)
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
                'other_document3',
                //! Certification
                'iso_14064_1_2018',
                'iso_14001_2015',
                'iso_26000',
                'iso_iec_17025_2017',
                'iso_9001',
                'ohsas_18001_2007',
                'iaft_16949_2016',
                'tls_8001_2003',
                'tis_18001_1999',
                'cbam_certificates',
                'energy_saving_label_number_5',
                'green_industry_symbol',
                'fsc_symbol',
                'carbon_reduction_label',
                'green_industry_certification',
                'green_label',
                'certification_other',
                //! Benefits
                'boi',
                'free_zone',
                'jtepa',
                'benefits_others',
                //!
                'bom_process',
                'cost_break_down',
                'quotation',
                'internal_other1',
                'internal_other2',
                'internal_other3',
            ];

            //! regis_id
            //! doc_name
            //! pdf file (base64)
            $rules = [
                'regis_id' => ["required", "uuid", "string"],
                'doc_name' => ["required", "string", Rule::in($docNames)],
                'content'  => ["required", "string", "min:500", new Base64],
                // 'content' => ["required", "string"],
            ];
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) return response()->json([
                "status" => "error",
                "message" => "การร้องขอล้มเหลว",
                "data" => [
                    [
                        "validator" => $validator->errors()
                    ]
                ]
            ], 400);

            $regisId = $validator->validated()["regis_id"];
            $docName = $validator->validated()["doc_name"];

            // if (!\in_array($docName, $docNames)) {
            //     return response()->json([
            //         "status" => "error",
            //         "message" => "การร้องขอล้มเหลว (ชื่อเอกสารไม่ถูกต้อง)",
            //         "data" => [
            //             // ["validator" => "doc_name ($docName) does not match."]
            //         ]
            //     ], 400);
            // }

            // return response()->json($request->all());

            //! Block by role
            if (!\in_array($decoded->role, ['admin', 'user'])) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สิทธิ์ในการใช้งานไม่ถูกต้อง)",
                "data" => [],
            ], 401);
            //! ./Block by role

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [2, 4, 5, 6, 7, 8])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [0, 1, 3])->get();
            if (\count($result) > 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถแก้ไขข้อมูลการลงทะเบียนได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            $fileName = "documents->>'" . $docName . "'";

            $result = DB::table("tb_regis_documents")->selectRaw("document_id, folder_name, $fileName as path_name")->where(["regis_id" => $regisId])->take(1)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "regis_id ไม่มีอยู่ในระบบ",
                "data" => []
            ], 400);

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

            DB::table("tb_regis_documents")->where(["document_id" => $result[0]->document_id])->update([
                "folder_name" => $regisId,
                "documents->$docName" => $genFilename,
                "updated_at" => DB::raw("now()"),
            ]);

            return response()->json([
                "status" => "success",
                "message" => "อัพโหลดเอกสารสำเร็จ",
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

    //! Block Role OK
    //! [DELETE] /registration/delete-document
    function deleteDocument(Request $request)
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
                'other_document3',
                //! Certification
                'iso_14064_1_2018',
                'iso_14001_2015',
                'iso_26000',
                'iso_iec_17025_2017',
                'iso_9001',
                'ohsas_18001_2007',
                'iaft_16949_2016',
                'tls_8001_2003',
                'tis_18001_1999',
                'cbam_certificates',
                'energy_saving_label_number_5',
                'green_industry_symbol',
                'fsc_symbol',
                'carbon_reduction_label',
                'green_industry_certification',
                'green_label',
                'certification_other',
                //! Benefits
                'boi',
                'free_zone',
                'jtepa',
                'benefits_others',
                //!
                'bom_process',
                'cost_break_down',
                'quotation',
                'internal_other1',
                'internal_other2',
                'internal_other3',
            ];

            //! regis_id
            //! doc_name
            //! pdf file (base64)
            $rules = [
                'regis_id' => ["required", "uuid", "string"],
                'doc_name' => ["required", "string", Rule::in($docNames)],
                // 'content'  => ["required", "string", "min:500", new Base64],
                // 'content' => ["required", "string"],
            ];
            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) return response()->json([
                "status" => "error",
                "message" => "การร้องขอล้มเหลว",
                "data" => [
                    [
                        "validator" => $validator->errors()
                    ]
                ]
            ], 400);

            $regisId = $validator->validated()["regis_id"];
            $docName = $validator->validated()["doc_name"];

            //! Block by role
            if (!\in_array($decoded->role, ['admin', 'user'])) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สิทธิ์ในการใช้งานไม่ถูกต้อง)",
                "data" => [],
            ], 401);
            //! ./Block by role

            // return response()->json($request->all());

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [2, 4, 5, 6, 7, 8])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [0, 1, 3])->get();
            if (\count($result) > 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถแก้ไขข้อมูลการลงทะเบียนได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            $fileName = "documents->>'" . $docName . "'";

            $result = DB::table("tb_regis_documents")->selectRaw("document_id, folder_name, $fileName as path_name")->where(["regis_id" => $regisId])->take(1)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "regis_id ไม่มีอยู่ในระบบ",
                "data" => []
            ], 400);

            $path = \getcwd() . "\\..\\..\\docs\\pdf\\";
            // if (!\is_dir($path)) \mkdir($path, 0777, true);

            $folderPath = $path . $regisId . "\\";
            // if (!\is_dir($folderPath)) \mkdir($folderPath, 0777, true);

            $pathOfOldFile = $folderPath . $result[0]->path_name;
            if (\file_exists($pathOfOldFile) && \strlen($result[0]->path_name) != 0) \unlink($pathOfOldFile);

            DB::table("tb_regis_documents")->where(["document_id" => $result[0]->document_id])->update([
                "folder_name" => $regisId,
                "documents->$docName" => "",
                "updated_at" => DB::raw("now()"),
            ]);

            return response()->json([
                "status" => "success",
                "message" => "ลบเอกสารสำเร็จ",
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

    //* [GET] /registration/get-documents-by-id?regis_id=<uuid>
    function getDocumentsByID(Request $request)
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

            $rules = ["regis_id" => "required|uuid|string"];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) return response()->json([
                "status" => "error",
                "message" => "การร้องขอล้มเหลว",
                "data" => [
                    [
                        "validator" => $validator->errors()
                    ]
                ]
            ], 400);

            // return response()->json([]);

            // $cacheKey = "/registration/documents-by-id/" . $request->regis_id;

            $result = DB::table("tb_regis_documents")->select(["folder_name", "documents"])->where("regis_id", $request->regis_id)->take(1)->get();

            // if (\count($result) == 0 || \is_null($result[0]->folder_name)) return response()->json([
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "Files does not exists",
                "data" => [],
            ]);

            // $data = array();
            foreach ($result as $row) {
                $row->file_path = \is_null($row->folder_name) ? "" : DOCS_BASE_PATH . $row->folder_name . "/";
                $row->documents = \json_decode($row->documents);
                // $documents = array();
                // $docs = (array)\json_decode($row->documents);
                // foreach (\array_keys($docs) as $key) {
                //     $filePath = "";
                //     if (\strlen($docs[$key]) > 4) $filePath = DOCS_BASE_PATH . $row->folder_name . "/" . $docs[$key];
                //     $documents[$key] = $filePath; //! file name
                // }
                // \array_push($data, ["folder_name" => $row->folder_name, "documents" => $documents]);
            }

            return response()->json([
                "status" => "success",
                "message" => "Data from query",
                "data" => $result,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ]);
        }
    }

    //! Block Role OK
    //TODO [POST] /registration (create)
    function create(Request $request)
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

            $rules = [
                'regis_id' => 'required|uuid|string',
                'informant_name' => 'required|string',
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
                'company_information.nature_of_business' => 'required|integer|min:0',
                'company_information.company_registration.is_thai' => 'required|boolean',
                // 'company_information.company_registration.country' => 'required_if:company_information.company_registration.is_thai,false|string',
                'company_information.company_registration.country' => 'sometimes|string|nullable',
                // 'company_information.company_registration.country' => 'nullable|string',
                // 'company_information.company_registration.country' => 'required_if:company_information.company_registration.is_thai,false|string',

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
                'relationship.relationship_name' => 'nullable|string',
                // 'relationship.relationship_name' => 'required_if:relationship.is_relationship,true|string',

                'standard.certificate.*.cer_id' => 'required|integer|min:1',
                'standard.certificate.*.cer_name_th' => 'required|string',
                'standard.certificate.*.cer_name_en' => 'required|string',
                'standard.certificate.*.is_checked' => 'required|boolean',
                'standard.certificate.*.value' => 'nullable|string',
                'standard.certificate.*.exp' => 'nullable|string',
                'standard.benefit.*.cer_id' => 'required|integer|min:1',
                'standard.benefit.*.cer_name_th' => 'required|string',
                'standard.benefit.*.cer_name_en' => 'required|string',
                'standard.benefit.*.is_checked' => 'required|boolean',
                'standard.benefit.*.value' => 'nullable|string',
                'standard.benefit.*.exp' => 'nullable|string',

                'payment_term.credit_term.name' => 'nullable|string',
                'payment_term.credit_term.value' => 'nullable|integer',
                'payment_term.billing_term.name' => 'nullable|string',
                'payment_term.billing_term.value' => 'nullable|string',
                'payment_term.currency' => 'nullable|string',
                'payment_term.incoterm' => 'nullable|string',
                'payment_term.lc_term.is_lc' => 'nullable|boolean',
                'payment_term.lc_term.lc_type' => 'nullable|string',
                'payment_term.delivery_term.*.cer_id' => 'required|integer|min:1',
                'payment_term.delivery_term.*.cer_name_th' => 'required|string',
                'payment_term.delivery_term.*.cer_name_en' => 'required|string',
                'payment_term.delivery_term.*.is_checked' => 'required|boolean',
                'payment_term.deposit_term.is_deposit' => 'required_if:company_information.company_registration.is_thai,true|boolean',
                'payment_term.deposit_term.deposit_type' => 'required_if:company_information.company_registration.is_thai,true|string|in:30-70,50-50,60-40,70-30',
                'payment_term.product_warranty.is_warranty' => 'required|boolean',
                'payment_term.product_warranty.value' => 'required_if:payment_term.product_warranty.is_warranty,true|integer|min:1',
                // 'payment_term.product_warranty.value' => 'nullable|integer',
                'payment_term.company_policy.*.cer_id' => 'required|integer|min:1',
                'payment_term.company_policy.*.cer_name_th' => 'required|string',
                'payment_term.company_policy.*.cer_name_en' => 'required|string',
                'payment_term.company_policy.*.is_checked' => 'required|boolean',
                'payment_term.objective_purchasing.name' => 'required|string|in:trade,produce,other',
                'payment_term.objective_purchasing.value' => 'nullable|string',
                'payment_term.main_customer.name' => 'required|string|in:internal,foreign', //foreign
                'payment_term.main_customer.value' => 'nullable|string',
            ];

            $cacheKey = "/registration/create/last-regis-id";

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) return response()->json([
                "status" => "error",
                "message" => "การร้องขอล้มเหลว",
                "data" => [
                    [
                        "validator" => $validator->errors()
                    ]
                ]
            ], 400);

            //! Block by role
            if (!\in_array($decoded->role, ['admin', 'user'])) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สิทธิ์ในการใช้งานไม่ถูกต้อง)",
                "data" => [],
            ], 401);
            //! ./Block by role

            $regis_id = $request->regis_id;

            $cached = Cache::get($cacheKey);
            if (!\is_null($cached) && $cached == $regis_id) return response()->json([
                "status" => "error",
                "message" => "regis_id นี้มีอยู่แล้ว",
                "data" => [],
            ]);

            $result = DB::table("tb_regis_informations")->select(["regis_id"])->where("regis_id", $regis_id)->get();
            if (\count($result) > 0) return response()->json([
                "status" => "error",
                "message" => "regis_id นี้มีอยู่แล้ว",
                "data" => [],
            ]);

            // return response()->json($validator->validated());

            $informant_name         = $request->informant_name;
            $company_information    = \json_encode($request->company_information);
            $share_holder           = \json_encode($request->share_holder);
            $contact_person         = \json_encode($request->contact_person);
            $standard               = \json_encode($request->standard);
            $relationship           = \json_encode($request->relationship);
            $payment_term           = \json_encode($request->payment_term);

            // $result = Company::insert([
            DB::table("tb_regis_informations")->insert([
                "regis_id"              => $regis_id,
                "informant_name"        => $informant_name,
                "company_information"   => $company_information,
                "share_holder"          => $share_holder,
                "contact_person"        => $contact_person,
                "standard"              => $standard,
                "relationship"          => $relationship,
                "payment_term"          => $payment_term,
                "status_no"             => 1, //! รอตรวจสอบข้อมูล
                "creator_id"            => $decoded->user_id,
            ]);

            DB::table("tb_general_assessments")->insert([
                "regis_id"              => $regis_id,
            ]);

            Cache::put($cacheKey, $regis_id, \DateInterval::createFromDateString('30 seconds'));

            DB::table("tb_run_registrations")->where("regis_id", $regis_id)->update(["is_used" => true]);

            return response()->json([
                "status" => "success",
                "message" => "ลงทะเบียนสำเร็จ",
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

    //* [GET] /registration/info (read)
    function getInfo(Request $request)
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

            $rules = [
                'regis_id' => 'required|uuid|string',
            ];

            $validator = Validator::make($request->all(), $rules);

            // $cacheKeyLastID = "/registration/info/last-regis-id";
            // $cacheKeyLastValue = "/registration/info/last-value";

            if ($validator->fails()) return response()->json([
                "status" => "error",
                "message" => "การร้องขอล้มเหลว",
                "data" => [
                    [
                        "validator" => $validator->errors()
                    ]
                ]
            ], 400);

            $result = array();
            // return response()->json($validator->validated());

            // $cachedID = Cache::get($cacheKeyLastID);
            // $cachedValue = Cache::get($cacheKeyLastValue);
            // $message = "Data from cached";
            // if (!\is_null($cachedID) && $cachedID == $request->id) {
            //     $result = \json_decode($cachedValue);
            // } else {
            $result = DB::table("tb_regis_informations")->selectRaw(
                "regis_id
                    ,company_information
                    ,share_holder
                    ,contact_person
                    ,standard
                    ,relationship
                    ,payment_term
                    ,informant_name
                    ,status_no
                    ,created_at::varchar(19) as created_at
                    ,updated_at::varchar(19) as updated_at"
            )->where("regis_id", $request->regis_id)->get();

            // $ttl = \DateInterval::createFromDateString('1 minutes');
            // Cache::put($cacheKeyLastID, $request->id, $ttl);
            // Cache::put($cacheKeyLastValue, \json_encode($result), $ttl);
            $message = "Data from query";
            // }

            foreach ($result as $row) {
                $row->company_information   = \json_decode($row->company_information);
                $row->share_holder          = \json_decode($row->share_holder);
                $row->contact_person        = \json_decode($row->contact_person);
                $row->standard              = \json_decode($row->standard);
                $row->relationship          = \json_decode($row->relationship);
                $row->payment_term          = \json_decode($row->payment_term);
            }

            return response()->json([
                "status" => "success",
                "message" => $message,
                "data" => $result,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //* [GET] /registration (read)
    function getAll(Request $request)
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

            // $cacheKey = "/registration/get-all-" . \json_encode($decoded->company);

            // $result = array();
            // return response()->json($validator->validated());

            // $cached = Cache::get($cacheKey);
            // if (!\is_null($cached)) return response()->json([
            //     "status" => "success",
            //     "message" => "Data from cached",
            //     "data" => \json_decode($cached),
            // ]);

            // $result = DB::table("tb_regis_informations")->selectRaw(
            //     "regis_id
            //         ,informant_name
            //         ,status_no
            //         ,created_at::varchar(19) as created_at
            //         ,updated_at::varchar(19) as updated_at"
            // )->get();

            $result = DB::table("tb_regis_informations as t1")->selectRaw(
                "t1.regis_id
                ,t1.company_information->>'juristic_id' as juristic_id
                ,t1.company_information->>'company_name' as company_name
                ,t1.company_information->>'company_admin' as company_admin
                ,t1.created_at::varchar(19) as created_at
                ,t1.status_no
                ,t2.status_desc_th"
            )->leftJoin("tb_all_status as t2", "t1.status_no", "=", "t2.status_no")->whereIn("t1.company_information->company_admin", $decoded->company)->orderByDesc("created_at")->get(); //$decoded->company

            // Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('1 minutes'));
            // Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('30 seconds'));

            return response()->json([
                "status" => "success",
                "message" => "Data from query",
                "data" => $result,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //* [GET] /registration/your-approve-items (read)
    function yourApproveItems(Request $request)
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

            // $cacheKey = "/registration/get-all-" . \json_encode($decoded->company);

            // $result = array();
            // // return response()->json($validator->validated());

            // $cached = Cache::get($cacheKey);
            // if (!\is_null($cached)) return response()->json([
            //     "status" => "success",
            //     "message" => "Data from cached",
            //     "data" => \json_decode($cached),
            // ]);

            $result = DB::table("vw_current_approvers as v1")->selectRaw(
                "v1.regis_id
                ,t1.company_information->>'juristic_id' as juristic_id
                ,t1.company_information->>'company_name' as company_name
                ,t1.company_information->>'company_admin' as company_admin
                ,t1.created_at::varchar(19) as created_at
                ,t1.status_no
                ,t2.status_desc_th"
            )->leftJoin("tb_regis_informations as t1", "v1.regis_id", "=", "t1.regis_id")
                ->leftJoin("tb_all_status as t2", "t1.status_no", "=", "t2.status_no")->where(
                    "v1.approver_id",
                    $decoded->user_id
                )->orderByDesc("created_at")->get(); //$decoded->company

            // Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('1 minutes'));
            // Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('30 seconds'));

            return response()->json([
                "status" => "success",
                "message" => "Data from query",
                "data" => $result,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //! Block Role OK
    //? [PUT] /registration (update)
    function update(Request $request)
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

            $rules = [
                'regis_id' => 'required|uuid|string',
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
                'company_information.nature_of_business' => 'required||integer|min:0',
                'company_information.company_registration.is_thai' => 'required|boolean',
                // 'company_information.company_registration.country' => 'required_if:company_information.company_registration.is_thai,false|string',
                'company_information.company_registration.country' => 'sometimes|string|nullable',
                // 'company_information.company_registration.country' => 'nullable|string',
                // 'company_information.company_registration.country' => 'required_if:company_information.company_registration.is_thai,false|string',

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
                'relationship.relationship_name' => 'nullable|string',
                // 'relationship.relationship_name' => 'required_if:relationship.is_relationship,true|string',

                'standard.certificate.*.cer_id' => 'required|integer|min:1',
                'standard.certificate.*.cer_name_th' => 'required|string',
                'standard.certificate.*.cer_name_en' => 'required|string',
                'standard.certificate.*.is_checked' => 'required|boolean',
                'standard.certificate.*.value' => 'nullable|string',
                'standard.certificate.*.exp' => 'nullable|string',
                'standard.benefit.*.cer_id' => 'required|integer|min:1',
                'standard.benefit.*.cer_name_th' => 'required|string',
                'standard.benefit.*.cer_name_en' => 'required|string',
                'standard.benefit.*.is_checked' => 'required|boolean',
                'standard.benefit.*.value' => 'nullable|string',
                'standard.benefit.*.exp' => 'nullable|string',

                'payment_term.credit_term.name' => 'nullable|string',
                'payment_term.credit_term.value' => 'nullable|integer',
                'payment_term.billing_term.name' => 'nullable|string',
                'payment_term.billing_term.value' => 'nullable|string',
                'payment_term.currency' => 'nullable|string',
                'payment_term.incoterm' => 'nullable|string',
                'payment_term.lc_term.is_lc' => 'nullable|boolean',
                'payment_term.lc_term.lc_type' => 'nullable|string',
                'payment_term.delivery_term.*.cer_id' => 'required|integer|min:1',
                'payment_term.delivery_term.*.cer_name_th' => 'required|string',
                'payment_term.delivery_term.*.cer_name_en' => 'required|string',
                'payment_term.delivery_term.*.is_checked' => 'required|boolean',
                'payment_term.deposit_term.is_deposit' => 'required_if:company_information.company_registration.is_thai,true|boolean',
                'payment_term.deposit_term.deposit_type' => 'required_if:company_information.company_registration.is_thai,true|string|in:30-70,50-50,60-40,70-30',
                'payment_term.product_warranty.is_warranty' => 'required|boolean',
                'payment_term.product_warranty.value' => 'required_if:payment_term.product_warranty.is_warranty,true|integer|min:1',
                // 'payment_term.product_warranty.value' => 'nullable|integer',
                'payment_term.company_policy.*.cer_id' => 'required|integer|min:1',
                'payment_term.company_policy.*.cer_name_th' => 'required|string',
                'payment_term.company_policy.*.cer_name_en' => 'required|string',
                'payment_term.company_policy.*.is_checked' => 'required|boolean',
                'payment_term.objective_purchasing.name' => 'required|string|in:trade,produce,other',
                'payment_term.objective_purchasing.value' => 'nullable|string',
                'payment_term.main_customer.name' => 'required|string|in:internal,foreign', //foreign
                'payment_term.main_customer.value' => 'nullable|string',
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) return response()->json([
                "status" => "error",
                "message" => "การร้องขอล้มเหลว",
                "data" => [
                    [
                        "validator" => $validator->errors()
                    ]
                ]
            ], 400);

            // return response()->json($validator->validated());

            //! Block by role
            if (!\in_array($decoded->role, ['admin', 'user'])) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สิทธิ์ในการใช้งานไม่ถูกต้อง)",
                "data" => [],
            ], 401);
            //! ./Block by role

            $regis_id               = $request->regis_id;
            $company_information    = \json_encode($request->company_information);
            $share_holder           = \json_encode($request->share_holder);
            $contact_person         = \json_encode($request->contact_person);
            $standard               = \json_encode($request->standard);
            $relationship           = \json_encode($request->relationship);
            $payment_term           = \json_encode($request->payment_term);

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $regis_id)->whereIn("status_no", [0, 1, 3])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [0, 1, 3])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถแก้ไขข้อมูลการลงทะเบียนได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            // $result = Company::insert([
            DB::table("tb_regis_informations")->where("regis_id", $regis_id)->update([
                "company_information"   => $company_information,
                "share_holder"          => $share_holder,
                "contact_person"        => $contact_person,
                "standard"              => $standard,
                "relationship"          => $relationship,
                "payment_term"          => $payment_term,
                "updated_at"            => DB::raw("now()"),
            ]);

            return response()->json([
                "status" => "success",
                "message" => "แก้ไขข้อมูลการลงทะเบียนสำเร็จ",
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
}
