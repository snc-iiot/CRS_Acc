<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Company;
use Illuminate\Support\Facades\DB;

class CompanyController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
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

            \date_default_timezone_set('Asia/Bangkok');
            $now = new \DateTime();


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

                'share_holder.hight_nationalities.nationalities' => 'required|string',
                'share_holder.hight_nationalities.percentage' => 'required|integer|min:0|max:100',
                'share_holder.thai_nationalities' => 'required|integer|min:0|max:100',
                'share_holder.other_nationalities' => 'required|integer|min:0|max:100',

                'contact_person.*.position' => 'required|string',
                'contact_person.*.name' => 'required|string',
                'contact_person.*.phone_number' => 'required|string',
                'contact_person.*.email' => 'required|email',

                'relationship.is_relationship' => 'required|boolean',
                'relationship.relationship_name' => 'required_if:relationship.is_relationship,true|string',

                'standard.certificate.*.name' => 'required|string',
                'standard.certificate.*.label' => 'required|string',
                'standard.certificate.*.labelEN' => 'required|string',
                'standard.certificate.*.isChecked' => 'required|boolean',
                'standard.certificate.*.value' => 'required|string',
                'standard.certificate.*.exp' => 'required|string',
                'standard.benefit.*.name' => 'required|string',
                'standard.benefit.*.label' => 'required|string',
                'standard.benefit.*.labelEN' => 'required|string',
                'standard.benefit.*.isChecked' => 'required|boolean',
                'standard.benefit.*.value' => 'required|string',
                'standard.benefit.*.exp' => 'required|string',
                'payment_term.credit_term.name' => 'required|string',
                'payment_term.credit_term.value' => 'required|string',
                'payment_term.billing_term.name' => 'required|string',
                'payment_term.billing_term.value' => 'required|string',
                'payment_term.currency' => 'required|string',
                'payment_term.incoterm' => 'required|string',
                'payment_term.L/C_term.is_L/C' => 'required|boolean',
                'payment_term.L/C_term.L/C_type' => 'required|string',
                'payment_term.delivery_term.*.label_th' => 'required|string',
                'payment_term.delivery_term.*.label_en' => 'required|string',
                'payment_term.delivery_term.*.is_checked' => 'required|boolean',
            ];


            $validator = Validator::make($request->all(), $rules);
            if ($validator->passes()) {
                $company_information = $request->company_information;
                $share_holder = $request->share_holder;
                $contact_person = $request->contact_person;
                $standard = $request->standard;
                $relationship = $request->relationship;

                $result = Company::insert([
                    "company_information" => $company_information,
                    "share_holder" => $share_holder,
                    "contact_person" => $contact_person,
                    "standard" => $standard,
                    "relationship" => $relationship,
                    "timestamp" => $now,
                ]);

                return response()->json([
                    "status" => 'success',
                    "message" => "Added company successfully",
                    "data" => [
                        [
                            "result" => $result
                        ]
                    ],
                ]);
            } else {
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
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }


    //Edit Device
    function editDevice(Request $request)
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

            \date_default_timezone_set('Asia/Bangkok');
            $update_datetime = new \DateTime();

            $validator = Validator::make(
                $request->all(),
                [
                    'serial_no'     => 'required|string|min:1|max:255',
                    'device_name'   => 'required|string|min:1|max:255',
                    // 'ip_address'    => 'required|string|min:7|max:15',
                    'status'        => 'required|string|min:1|max:15',
                    // 'remarks'       => 'required|string|min:0|max:255',
                    // 'is_active'     => 'required|boolean',
                ]
            );
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

            $serial_no = $request->serial_no;
            $device_name = $request->device_name;
            $ip_address = $request->ip_address;
            $status = $request->status;
            $remarks = $request->remarks;
            $is_active = $request->is_active;

            if ($status === "broken") {
                $new_name = $device_name . '' . now()->format('Y-m-d h:i:sa');

                $result = Company::where('serial_no', $serial_no)->update([
                    'serial_no'     => $serial_no,
                    'device_name'   => $new_name,
                    'status'        => $status,
                    'remarks'       => $remarks,
                    'is_active' => $is_active
                ]);
            } else {
                $result = Company::where('serial_no', $serial_no)->update([
                    'serial_no'     => $serial_no,
                    'device_name'   => $device_name,
                    'status'        => $status,
                    'remarks'       => $remarks,
                    'is_active' => $is_active
                ]);
            }
            return response()->json([
                "status" => 'success',
                "message" => "Edited device successfully",
                "data" => [
                    [
                        "result" => $update_datetime
                    ]
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    // Delete Decvice
    // function deleteDevice($serial_no, Request $request)
    // {
    //     try {
    //         $header = $request->header('Authorization');
    //         $jwt = $this->jwtUtils->verifyToken($header);
    //         if (!$jwt->state) return response()->json([
    //             "status" => "error",
    //             "message" => "Unauthorized",
    //             "data" => [],
    //         ], 401);
    //         // $decoded = $jwt->decoded;

    //         $result = Device::where('serial_no', $serial_no)->delete();

    //         return response()->json([
    //             "status" => 'success',
    //             "message" => "Deleted device successfully",
    //             "data" => [
    //                 [
    //                     "result" => $result
    //                 ]
    //             ],
    //         ]);
    //     } catch (\Exception $e) {
    //         return response()->json([
    //             "status" => "error",
    //             "message" => $e->getMessage(),
    //             "data" => [],
    //         ], 500);
    //     }
    // }

    //* [GET] /devices/get-all-devices
    function getAllDevices(Request $request)
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

            // $result = Devices::orderBy("serial_no")->orderByDesc("import_at")->get();
            // $result = Devices::selectRaw(
            //     "serial_no
            //     ,device_name
            //     ,status
            //     ,remarks
            //     ,battery
            //     ,ip_address
            //     ,last_actived_at::varchar(19) as last_actived_at
            //     ,last_actived_at::timestamp::varchar(19) as last_actived_at
            //     ,created_at::varchar(19) as _created_at
            //     ,updated_at::varchar(19) as _updated_at
            //     "
            // )->orderBy("created_at")->get();

            $result = DB::table('devices')->selectRaw(
                "serial_no
                ,device_name
                ,status
                ,remarks
                ,battery
                ,ip_address
                ,last_actived_at::varchar(19) as last_actived_at
                ,last_actived_at::timestamp::varchar(19) as last_actived_at
                ,created_at::varchar(19) as created_at
                ,updated_at::varchar(19) as updated_at
                "
            )->orderBy('created_at')->get();

            return response()->json([
                "status" => 'success',
                "message" => "OK",
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
}
