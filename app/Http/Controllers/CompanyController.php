<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Company;
use App\Models\Documents;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
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
