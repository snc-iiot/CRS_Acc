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

class AdminController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    //!ดึงข้อมูลมาเเสดง
    function companyDetail(Request $request)
    {
        try {

            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
                "data" => [],
            ], 401);

            $rules = [
                'regis_id' => ["required", "string"],
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

            $regis_id = $validator->validated()["regis_id"];

            $data = DB::table("dev_company_informations")->where('regis_id', $regis_id)->take(1)->get();
            $data2 = DB::table("dev_documents")->where('regis_id', $regis_id)->take(1)->get();
            if (\count($data) == 0) return response()->json([
                "status" => "error",
                "message" => "There is no data country in the iCRS system",
                "data" => []
            ]);

            return response()->json([
                "status" => "success",
                "message" => "data output success",
                "data" => $data,
                "data2" => $data2,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ], 500);
        }
    }

    //!Country Amount
    function regisCount(Request $request)
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

            $data = DB::table("tb_regis_old_count")->get();
            if (\count($data) == 0) return response()->json([
                "status" => "error",
                "message" => "There is no data country in the iCRS system",
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
}
