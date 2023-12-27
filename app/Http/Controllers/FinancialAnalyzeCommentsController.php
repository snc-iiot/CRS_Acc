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

class FinancialAnalyzeCommentsController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    //TODO [POST] /financial-comments (create)
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
                "regis_id"      => "required|uuid|string",
                "comments"      => "required|string|min:1|max:500",
                // "comments_type" => "required|string|in:general,edit,suspended,rejected",
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
            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [4])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->whereIn("status_no", [4])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถแก้ไขข้อมูลการลงทะเบียนได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            DB::table("tb_financial_analyze_comments")->insert([
                "regis_id"      => $request->regis_id,
                "comments"      => $request->comments,
                "creator_id"    => $decoded->user_id,
            ]);

            return response()->json([
                "status" => "success",
                "message" => "บันทึกข้อเสนอแนะทางการเงินสำเร็จ",
                "data" => []
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => [],
            ], 500);
        }
    }

    //* [GET] /financial-comments (read)
    function getAllComments(Request $request)
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

            $result = DB::table("tb_financial_analyze_comments as t1")->selectRaw(
                "t1.regis_id
                ,json_agg(json_build_object(
                    'comments_id', t1.fi_comment_id,
                    'comments', t1.comments,
                    'creator_id', t1.creator_id,
                    'created_at', t1.created_at::varchar(19),
                    'name_th', t2.name->>'th',
                    'name_en', t2.name->>'en'
                )) as comments"
            )->leftJoin("tb_users as t2", "t1.creator_id", "=", "t2.user_id")->where("t1.regis_id", $request->regis_id)->groupBy(["t1.regis_id"])->get();

            foreach ($result as $row) $row->comments = \json_decode($row->comments);

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
