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

    //TODO [POST] /dbd-financial-report/import-excel/financial-position (DBD Table1)
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
                "regis_id"              => "required|uuid|string",
                "content"               => "present|array|min:1",
                "content.*.topic_no"    => "required|integer|min:1",
                "content.*.topic_th"    => "required|string",
                "content.*.topic_en"    => "required|string",
                "content.*.short_key"   => "string|nullable",
                "content.*.info.*.year" => "required|integer|min:2000|max:4000",
                "content.*.info.*.amount" => "required|numeric|min:0",
                "content.*.info.*.change" => "required|numeric",
                // "content.*.info.*.change" => "required|numeric|regex:/^[0-9]+$/",
                // "content.*.info.*.change" => "required|numeric|regex:/^[-+]?([0-9]*[.])?[0-9]+$/",
                // "content.*.info.*.change" => "required|numeric|regex:/^[+-]?([0-9]*[.])?[0-9]+$/",
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

            //! Get Juristic ID
            $result = DB::table("tb_regis_informations")->selectRaw("company_information->>'juristic_id' as juristic_id")->where("regis_id", $request->regis_id)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่พบหมายเลขนิติบุคคลในการลงทะเบียนนี้",
                "data" => []
            ], 400);

            $dbdTable = "tb_dbd_financial_reports";

            $checkOldData = DB::table($dbdTable)->select(["regis_id"])->where("regis_id", $request->regis_id)->get();
            $isInsert = \count($checkOldData) == 0;

            $juristicID = $result[0]->juristic_id;
            $firstItem = $request->content[0];
            $startYear = null;
            $lastYear = null;
            if (\count($firstItem['info']) > 0) {
                $startYear = \array_slice($firstItem['info'], 0, 1)[0]['year'];
                $lastYear = \array_slice($firstItem['info'], -1, 1)[0]['year'];
            }

            $financialPositionArr = array();
            foreach ($request->content as $item) {
                \array_push($financialPositionArr, "'" . \json_encode($item, JSON_UNESCAPED_UNICODE) . "'");
            }

            $data = [
                "regis_id"                      => $request->regis_id,
                "juristic_id"                   => $juristicID,
                "financial_position"            => \json_encode($request->content, JSON_UNESCAPED_UNICODE),
                "financial_position_arr"        => DB::raw("array[" . \join(",", $financialPositionArr) . "]::jsonb[]"),
                "start_year"                    => $startYear,
                "last_year"                     => $lastYear,
            ];

            $cursor = DB::table($dbdTable);
            $isInsert ? $cursor->insert($data) : $cursor->where("regis_id", $request->regis_id)->update($data);

            return response()->json([
                "status" => "success",
                "message" => "นำเข้าเอกสารงบแสดงฐานะการเงินสำเร็จ",
                "data" => [],
                // "data" => [],
                // "data" => $validator->validated(),
                // "data" => $first['info'],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //TODO [POST] /dbd-financial-report/import-excel/icome-statement (DBD Table2)
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
                "regis_id"              => "required|uuid|string",
                "content"               => "present|array|min:1",
                "content.*.topic_no"    => "required|integer|min:1",
                "content.*.topic_th"    => "required|string",
                "content.*.topic_en"    => "required|string",
                "content.*.short_key"   => "string|nullable",
                "content.*.info.*.year" => "required|integer|min:2000|max:4000",
                "content.*.info.*.amount" => "required|numeric|min:0",
                "content.*.info.*.change" => "required|numeric",
                // "content.*.info.*.change" => "required|numeric|regex:/^[0-9]+$/",
                // "content.*.info.*.change" => "required|numeric|regex:/^[-+]?([0-9]*[.])?[0-9]+$/",
                // "content.*.info.*.change" => "required|numeric|regex:/^[+-]?([0-9]*[.])?[0-9]+$/",
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

            //! Get Juristic ID
            $result = DB::table("tb_regis_informations")->selectRaw("company_information->>'juristic_id' as juristic_id")->where("regis_id", $request->regis_id)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่พบหมายเลขนิติบุคคลในการลงทะเบียนนี้",
                "data" => []
            ], 400);

            $dbdTable = "tb_dbd_financial_reports";

            $checkOldData = DB::table($dbdTable)->select(["regis_id"])->where("regis_id", $request->regis_id)->get();
            $isInsert = \count($checkOldData) == 0;

            $juristicID = $result[0]->juristic_id;
            $firstItem = $request->content[0];
            $startYear = null;
            $lastYear = null;
            if (\count($firstItem['info']) > 0) {
                $startYear = \array_slice($firstItem['info'], 0, 1)[0]['year'];
                $lastYear = \array_slice($firstItem['info'], -1, 1)[0]['year'];
            }

            $incomeStatementArr = array();
            foreach ($request->content as $item) {
                \array_push($incomeStatementArr, "'" . \json_encode($item, JSON_UNESCAPED_UNICODE) . "'");
            }

            $data = [
                "regis_id"                      => $request->regis_id,
                "juristic_id"                   => $juristicID,
                "income_statement"              => \json_encode($request->content, JSON_UNESCAPED_UNICODE),
                "income_statement_arr"          => DB::raw("array[" . \join(",", $incomeStatementArr) . "]::jsonb[]"),
                "start_year"                    => $startYear,
                "last_year"                     => $lastYear,
            ];

            $cursor = DB::table($dbdTable);
            $isInsert ? $cursor->insert($data) : $cursor->where("regis_id", $request->regis_id)->update($data);

            return response()->json([
                "status" => "success",
                "message" => "นำเข้าเอกสารงบกำไรขาดทุนสำเร็จ",
                "data" => [],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //TODO [POST] /dbd-financial-report/import-excel/financial-ratios (DBD Table3)
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
                "regis_id"              => "required|uuid|string",
                "content"               => "present|array|min:1",
                "content.*.topic_no"    => "required|integer|min:1",
                "content.*.topic_th"    => "required|string",
                "content.*.topic_en"    => "required|string",
                "content.*.short_key"   => "string|nullable",
                "content.*.info.*.year" => "required|integer|min:2000|max:4000",
                "content.*.info.*.ratio" => "required|numeric|min:0",
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

            //! Get Juristic ID
            $result = DB::table("tb_regis_informations")->selectRaw("company_information->>'juristic_id' as juristic_id")->where("regis_id", $request->regis_id)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่พบหมายเลขนิติบุคคลในการลงทะเบียนนี้",
                "data" => []
            ], 400);

            $dbdTable = "tb_dbd_financial_reports";

            $checkOldData = DB::table($dbdTable)->select(["regis_id"])->where("regis_id", $request->regis_id)->get();
            $isInsert = \count($checkOldData) == 0;

            $juristicID = $result[0]->juristic_id;
            $firstItem = $request->content[0];
            $startYear = null;
            $lastYear = null;
            if (\count($firstItem['info']) > 0) {
                $startYear = \array_slice($firstItem['info'], 0, 1)[0]['year'];
                $lastYear = \array_slice($firstItem['info'], -1, 1)[0]['year'];
            }

            $financialRatiosArr = array();
            $financialRatiosLatest = array();
            $financialRatiosLatestArr = array();
            foreach ($request->content as $item) {
                $infoLastYear = \array_slice((array)$item['info'], -1, 1)[0];
                $info = [
                    "topic_no"  => $item['topic_no'],
                    "topic_th"  => $item['topic_th'],
                    "topic_en"  => $item['topic_en'],
                    "short_key" => $item['short_key'],
                    "year"      => $infoLastYear['year'],
                    "ratio"     => $infoLastYear['ratio'],
                ];
                \array_push($financialRatiosLatest, $info);
                \array_push($financialRatiosArr, "'" . \json_encode($item, JSON_UNESCAPED_UNICODE) . "'");
                \array_push($financialRatiosLatestArr, "'" . \json_encode($info, JSON_UNESCAPED_UNICODE) . "'");
            }

            $data = [
                "regis_id"                      => $request->regis_id,
                "juristic_id"                   => $juristicID,
                "financial_ratios"              => \json_encode($request->content, JSON_UNESCAPED_UNICODE),
                "financial_ratios_latest"       => \json_encode($financialRatiosLatest, JSON_UNESCAPED_UNICODE),
                "financial_ratios_arr"          => DB::raw("array[" . \join(",", $financialRatiosArr) . "]::jsonb[]"),
                "financial_ratios_latest_arr"   => DB::raw("array[" . \join(",", $financialRatiosLatestArr) . "]::jsonb[]"),
                "start_year"                    => $startYear,
                "last_year"                     => $lastYear,
            ];
            // return response()->json($validator->validated());

            $cursor = DB::table($dbdTable);
            $isInsert ? $cursor->insert($data) : $cursor->where("regis_id", $request->regis_id)->update($data);

            return response()->json([
                "status" => "success",
                "message" => "นำเข้าเอกสารอัตราส่วนทางการเงินที่สำคัญสำเร็จ",
                "data" => [],
                // "data" => $data,
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
