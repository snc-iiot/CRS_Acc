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

    //! Block Role OK
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
            $decoded = $jwt->decoded;

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

            //! Block by role
            if (!\in_array($decoded->role, ['admin'])) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สิทธิ์ในการใช้งานไม่ถูกต้อง)",
                "data" => [],
            ], 401);
            //! ./Block by role

            // //! Block by status_no
            // $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [2])->get();
            // // $result = DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->whereIn("status_no", [4])->get();
            // if (\count($result) == 0) return response()->json([
            //     "status" => "error",
            //     "message" => "ไม่สามารถแก้ไขข้อมูลการลงทะเบียนได้ (สถานะไม่ถูกต้อง)",
            //     "data" => [],
            // ], 406);
            // //! ./Block by status_no

            $sub = DB::table("tb_dbd_financial_reports")->selectRaw("regis_id,juristic_id
            ,financial_position
            ,income_statement
            ,unnest(financial_ratios_latest_arr) as item
            ,start_year,last_year
            ,created_at::varchar(19) as created_at")->where("regis_id", $request->regis_id);

            // $cursor = DB::table(DB::raw("({$sub->toSql()}) as t1"));

            $result = DB::table(DB::raw("({$sub->toSql()}) as t1"))->mergeBindings($sub)->selectRaw(
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

    //! Block Role OK
    //! Mail OK
    //? [PATCH] /dbd-financial-report/confirm (update)
    function confirm(Request $request)
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

            //! Block by role
            if (!\in_array($decoded->role, ['admin'])) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สิทธิ์ในการใช้งานไม่ถูกต้อง)",
                "data" => [],
            ], 401);
            //! ./Block by role

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [2])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->whereIn("status_no", [4])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถแก้ไขข้อมูลการลงทะเบียนได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            DB::table("tb_general_assessments")->update([
                "is_acc_cf" => true,
                "acc_cf_id" => $decoded->user_id,
                "status_no" => 4, //! รอพิจารณาอนุมัติ
                "acc_cf_at" => DB::raw("now()"),
                "updated_at" => DB::raw("now()"),
            ]);

            DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->update([
                "status_no"            => 4, //! รอพิจารณาอนุมัติ
            ]);

            //! ส่งเมลเข้าสายอนุมัติ
            //! Send Mail
            DB::select("call sp_send_mail_to_first_approve(?);", [$request->regis_id]);

            return response()->json([
                "status" => "success",
                "message" => "ยืนยันข้อมูลทางการเงิน",
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

    //* [GET] /dbd-financial-report/info (read)
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

            $sub = DB::table("tb_dbd_financial_reports")->selectRaw("regis_id,juristic_id
            ,financial_position
            ,income_statement
            ,unnest(financial_ratios_latest_arr) as item
            ,start_year,last_year
            ,created_at::varchar(19) as created_at")->where("regis_id", $request->regis_id);

            $result = DB::table(DB::raw("({$sub->toSql()}) as t1"))->mergeBindings($sub)->selectRaw(
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

    //TODO [POST] /dbd-financial-report/import-excel/financial-position
    function financialPosition(Request $request)
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

            return response()->json([
                "status" => "success",
                "message" => "นำเข้าเอกสารงบแสดงฐานะการเงินสำเร็จ",
                "data" => []
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //TODO [POST] /dbd-financial-report/import-excel/icome-statement
    function icomeStatement(Request $request)
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

            return response()->json([
                "status" => "success",
                "message" => "นำเข้าเอกสารงบกำไรขาดทุนสำเร็จ",
                "data" => []
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //TODO [POST] /dbd-financial-report/import-excel/financial-ratios
    function financialRatios(Request $request)
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

            return response()->json([
                "status" => "success",
                "message" => "นำเข้าเอกสารอัตราส่วนทางการเงินที่สำคัญสำเร็จ",
                "data" => []
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
