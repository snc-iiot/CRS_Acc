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

    //Add Device
    function addDevice(Request $request)
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


            $validator = Validator::make(
                $request->all(),
                [
                    'company_admin'     => 'required|string|min:1|max:255',
                    'company_name'      => 'required|string|min:1|max:255',
                    'number'            => 'required|string|min:1|max:255',
                    'country'           => 'required|string|min:1|max:255',
                    'province'          => 'required|string|min:1|max:255',
                    'district'          => 'required|string|min:1|max:255',
                    'sub_district'      => 'required|string|min:1|max:255',
                    'post_code'         => 'required|string|min:1|max:255',
                    'tel'               => 'required|string|min:1|max:255',
                    'tax_payer'         => 'required|string|min:1|max:255',
                    'website'           => 'required|string|min:1|max:255',
                    'type_of_business'  => 'required|string|min:1|max:255',

                ]
            );


            $company_admin = $request->company_admin;
            $company_name = $request->company_name;
            $number = $request->number;
            $country = $request->country;
            $province = $request->province;
            $district = $request->district;
            $sub_district = $request->sub_district;
            $post_code = $request->post_code;
            $tel = $request->tel;
            $tax_payer = $request->tax_payer;
            $website = $request->website;
            $type_of_business = $request->type_of_business;


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

            $result = Company::insert([
                "company_admin" => $company_admin,
                "company_name" => $company_name,
                "number" => $number,
                "country" => $country,
                "province" => $province,
                "district" => $district,
                "sub_district" => $sub_district,
                "post_code" => $post_code,
                "tel" => $tel,
                "tax_payer" => $tax_payer,
                "website" => $website,
                "type_of_business" => $type_of_business,

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

            if ($status === "broken"){
                $new_name = $device_name . '' . now()->format('Y-m-d h:i:sa');

                $result = Company::where('serial_no', $serial_no)->update([
                    'serial_no'     => $serial_no,
                    'device_name'   => $new_name,
                    'status'        => $status,
                    'remarks'       => $remarks,
                    'is_active' => $is_active]);

            }else{
                $result = Company::where('serial_no', $serial_no)->update([
                    'serial_no'     => $serial_no,
                    'device_name'   => $device_name,
                    'status'        => $status,
                    'remarks'       => $remarks,
                    'is_active' => $is_active]);
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
