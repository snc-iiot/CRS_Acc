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

class DbdFinancialReportController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    //* [GET] /dbd-financial-report/sync-by-id (read)
    function syncByID(Request $request)
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

            //! Block by status_no
            // $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [2])->get();
            // // $result = DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->whereIn("status_no", [4])->get();
            // if (\count($result) == 0) return response()->json([
            //     "status" => "error",
            //     "message" => "ไม่สามารถแก้ไขข้อมูลการลงทะเบียนได้ (สถานะไม่ถูกต้อง)",
            //     "data" => [],
            // ], 406);
            //! ./Block by status_no

            // $result = DB::table("tb_dbd_financial_reports")->selectRaw(
            //     "regis_id,juristic_id
            //     ,financial_position
            //     ,income_statement
            //     ,financial_ratios_latest
            //     ,start_year,last_year
            //     ,created_at::varchar(19) as created_at"
            // )->where("regis_id", $request->regis_id)->get();

            // DB::table("tb_dbd_financial_reports")->selectSub(, "")
            $sub = DB::table("tb_dbd_financial_reports")->selectRaw("regis_id,juristic_id
            ,financial_position
            ,income_statement
            ,unnest(financial_ratios_latest_arr) as item
            ,start_year,last_year
            ,created_at::varchar(19) as created_at")->where("regis_id", $request->regis_id);

            $cursor = DB::table(DB::raw("({$sub->toSql()}) as t1"));

            // $result = $cursor->mergeBindings($sub)->selectRaw("regis_id,juristic_id
            // ,financial_position
            // ,income_statement
            // ,start_year,last_year
            // ,created_at
            // ,jsonb_agg(item) as financial_ratios_latest_arr")->whereIn(
            //     "item->>'short_key'",
            //     ['debt_to_equity_ratio', 'net_profit_margin', 'ROA', 'ROE']
            // )->groupByRaw("regis_id,juristic_id,financial_position,income_statement,start_year,last_year,created_at")->get();

            $result = $cursor->mergeBindings($sub)->selectRaw(
                "regis_id,juristic_id
            ,financial_position
            ,income_statement
            ,start_year,last_year
            ,created_at
            ,jsonb_agg(item) as financial_ratios_latest"
            )->whereIn(DB::raw("t1.item->>'short_key'"), ['debt_to_equity_ratio', 'net_profit_margin', 'ROA', 'ROE'])->groupByRaw(
                "regis_id,juristic_id,financial_position,income_statement,start_year,last_year,created_at"
            )->get();

            foreach ($result as $row) {
                $row->financial_position = \json_decode($row->financial_position);
                $row->income_statement = \json_decode($row->income_statement);
                $row->financial_ratios_latest = \json_decode($row->financial_ratios_latest);
            }

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