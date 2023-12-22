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

class ApprovalsActionController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }


    //? [PATCH] /approvals-action/send-to-edit (update)
    function sendToEdit(Request $request)
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
                'regis_id' => 'required|uuid|string',
                'comments' => 'required|string|min:2|max:500',
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

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [2, 4])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [2, 4])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถส่งกลับไปแก้ไขข้อมูลได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->update([
                "status_no"            => 3, //! รอการแก้ไข
            ]);

            //! Comments
            DB::table("tb_assessments_comments")->insert([
                "regis_id"          => $request->regis_id,
                "comments"          => $request->comments,
                "comments_type"     => 'edit',
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./Comments

            return response()->json([
                "status" => "success",
                "message" => "ส่งกลับไปแก้ไขสำเร็จ",
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

    //? [PATCH] /approvals-action/send-to-suspend (update)
    function sendToSuspend(Request $request)
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
                'regis_id' => 'required|uuid|string',
                'comments' => 'required|string|min:2|max:500',
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

            $regis_id = $request->regis_id;

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $regis_id)->whereIn("status_no", [4])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [4])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถระงับข้อมูลได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            DB::table("tb_regis_informations")->where("regis_id", $regis_id)->update([
                "status_no"            => 5, //! ระงับชั่วคราว
            ]);

            //! Comments
            DB::table("tb_assessments_comments")->insert([
                "regis_id"          => $request->regis_id,
                "comments"          => $request->comments,
                "comments_type"     => 'suspended',
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./Comments

            return response()->json([
                "status" => "success",
                "message" => "ระงับรายการสำเร็จ",
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

    //? [PATCH] /approvals-action/enter-customer-code (update)
    function enterCustomerCode(Request $request)
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
                'regis_id'      => 'required|uuid|string',
                'customer_code' => 'required|string|digits:6',
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

            return response()->json($validator->validated());

            // $regis_id = $request->regis_id;

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [6])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [4])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถระงับข้อมูลได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->update([
                "status_no"            => 8, //! ระงับชั่วคราว
            ]);

            // DB::table("tb_general_assessments")->where("regis_id", $regis_id)->update([
            //     "status_no"            => 5, //! รอการแก้ไข
            // ]);

            return response()->json([
                "status" => "success",
                "message" => "กรอกรหัสลูกค้าสำเร็จ",
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

    //? [PATCH] /approvals-action/reject (update)
    function reject(Request $request)
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
                'regis_id' => 'required|uuid|string',
                'comments' => 'required|string|min:2|max:500',
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

            $regis_id = $request->regis_id;

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $regis_id)->whereIn("status_no", [4])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [4])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถระงับข้อมูลได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            //! ------------
            // DB::table("tb_regis_informations")->where("regis_id", $regis_id)->update([
            //     "status_no"            => 7, //! ไม่อนุมัติ
            // ]);

            //! Comments
            DB::table("tb_assessments_comments")->insert([
                "regis_id"          => $request->regis_id,
                "comments"          => $request->comments,
                "comments_type"     => 'rejected',
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./Comments

            return response()->json([
                "status" => "success",
                "message" => "ทำรายการสำเร็จ",
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

    //? [PATCH] /approvals-action/approve (update)
    function approve(Request $request)
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
                'regis_id' => 'required|uuid|string',
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

            $regis_id = $request->regis_id;

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $regis_id)->whereIn("status_no", [4])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [4])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถระงับข้อมูลได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            //! ------------
            // DB::table("tb_regis_informations")->where("regis_id", $regis_id)->update([
            //     "status_no"            => 4, //! ไม่อนุมัติ
            // ]);

            return response()->json([
                "status" => "success",
                "message" => "อนุมัติสำเร็จ",
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
}
