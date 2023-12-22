<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
// use App\Rules\Base64;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use App\Models\Company;
// use App\Models\Documents;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Str;

class FinancialRatioAssessmentController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    //* [GET] /financial-ratio/info (read)
    function info(Request $request)
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
                "regis_id"      => "required|uuid|string",
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

            $result = DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->where("is_acc_cf", true)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "success",
                "message" => "Data from query",
                "data" => [],
            ]);

            $result = DB::table("tb_dbd_financial_reports")->selectRaw("regis_id,juristic_id
            ,financial_ratios
            ,start_year,last_year
            ,created_at::varchar(19) as created_at")->where("regis_id", $request->regis_id);

            foreach ($result as $row) $row->financial_ratios = \json_decode($row->financial_ratios);

            return response()->json([
                "status" => "success",
                "message" => "Data from query",
                "data" => $result
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
