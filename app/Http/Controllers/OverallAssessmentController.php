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

class OverallAssessmentController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    //* [GET] /assessment-result/companyProfile (read)
    function companyProfile(Request $request)
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

            // $cacheKey = "/registration/documents-by-id/" . $request->regis_id;

            $result = DB::table("tb_regis_informations as t1")->selectRaw(
                "t1.regis_id
                ,t1.company_information->>'company_name' as company_name
                ,t1.company_information->>'company_admin' as company_admin
                ,t3.company_full_name_th
                ,t3.company_full_name_en
                ,t2.products
                ,(t1.company_information->>'nature_of_business')::int as business_type_id
                ,t4.business_type_th
                ,t4.business_type_en"
            )->leftJoin("tb_general_assessments as t2", "t1.regis_id", "=", "t2.regis_id")
                ->leftJoin("tb_all_company as t3", DB::raw("t1.company_information->>'company_admin'"), "=", "t3.company")
                ->leftJoin("tb_business_types as t4", DB::raw("(t1.company_information->>'nature_of_business')::int"), "=", "t4.business_type_id")
                ->where("t1.regis_id", $request->regis_id)->get();

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

    //* [GET] /assessment-result/part1-score (read)
    function part1Score(Request $request)
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

            // $cacheKey = "/registration/documents-by-id/" . $request->regis_id;

            $topic1 = DB::table("vw_assessment_result_part1_1")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic2 = DB::table("vw_assessment_result_part1_2")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic3 = DB::table("vw_assessment_result_part1_3")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic4 = DB::table("vw_assessment_result_part1_4")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic5 = DB::table("vw_assessment_result_part1_5")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            //! topic6 L/C
            $topic6 = DB::table("vw_assessment_result_part1_6")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic7 = DB::table("vw_assessment_result_part1_7")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic8 = DB::table("vw_assessment_result_part1_8")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic9 = DB::table("vw_assessment_result_part1_9")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic10 = DB::table("vw_assessment_result_part1_10")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic11 = DB::table("vw_assessment_result_part1_11")->select(["regis_id", "part_no", "topic_no", "topic_no_hint", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);

            $result = $topic1->union($topic2)->union($topic3)->union($topic4)->union($topic5)->union($topic6)->union($topic7)->union($topic8)->union($topic9)
                ->union($topic10)->union($topic11)->orderBy("topic_no")->get();

            // $result = $cursor->orderBy("topic_no")->get();

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

    //* [GET] /assessment-result/part2-score (read)
    function part2Score(Request $request)
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

            // $cacheKey = "/registration/documents-by-id/" . $request->regis_id;

            //! Check Registration is_thai
            $isThai = false;
            $checkIsThai = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereRaw("(company_information->'company_registration'->>'is_thai')::bool")->get();
            if (\count($checkIsThai) != 0) $isThai = true;

            $topic1 = DB::table("vw_assessment_result_part2_1")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic2 = DB::table("vw_assessment_result_part2_2")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic3 = DB::table("vw_assessment_result_part2_3")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic4 = DB::table("vw_assessment_result_part2_4")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic5 = DB::table("vw_assessment_result_part2_5")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            //! topic6 L/C
            $topic6 = DB::table("vw_assessment_result_part2_6")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic7 = DB::table("vw_assessment_result_part2_7")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic8 = DB::table("vw_assessment_result_part2_8")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic9 = DB::table("vw_assessment_result_part2_9")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic10 = DB::table("vw_assessment_result_part2_10")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic11to16 = DB::table("vw_assessment_result_part2_11_to_16")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic17 = DB::table("vw_assessment_result_part2_17")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic18 = DB::table("vw_assessment_result_part2_18")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic19 = DB::table("vw_assessment_result_part2_19")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);
            $topic20 = DB::table("vw_assessment_result_part2_20")->select(["regis_id", "part_no", "topic_no", "label_th", "label_en", "score", "max_score"])->where("regis_id", $request->regis_id);

            $cursor = $topic1->union($topic2)->union($topic3)->union($topic4)->union($topic5)->union($topic7)->union($topic8)->union($topic9)
                ->union($topic10)->union($topic11to16)->union($topic17)->union($topic18)->union($topic19)->union($topic20);

            if (!$isThai) {
                $cursor->union($topic6);
            }

            $result = $cursor->orderBy("topic_no")->get();

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
}
