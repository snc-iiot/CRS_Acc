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

    //! Mail OK
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
            $result = DB::table("tb_regis_informations")->select(["status_no"])->where("regis_id", $request->regis_id)->whereIn("status_no", [2, 4])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $regis_id)->whereIn("status_no", [2, 4])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            if ($result[0]->status_no == 4) {
                //! Block by approver_id
                $result = DB::table("vw_current_approvers")->where("regis_id", $request->regis_id)->where("approver_id", $decoded->user_id)->get();
                if (\count($result) == 0) return response()->json([
                    "status" => "error",
                    "message" => "ไม่สามารถทำรายการได้ (คุณไม่มีสิทธิในการส่งกลับแก้ไข)",
                    "data" => [],
                ], 406);
                //! ./Block by approver_id
            }

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

            //! Send mail
            DB::select("call sp_send_mail_to_edit(?);", [$request->regis_id]);

            //! User Action Logger ********************************************************
            DB::table("tb_transaction_logger")->insert([
                "regis_id"          => $request->regis_id,
                "transaction_desc"  => "Send to edit",
                "api_endpoint"      => "[PATCH] /approvals-action/send-to-edit",
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./User Action Logger *******************************************************

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

    //! Mail OK
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

            //! Block by approver_id
            $result = DB::table("vw_current_approvers")->where("regis_id", $request->regis_id)->where("approver_id", $decoded->user_id)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (คุณไม่มีสิทธิในการระงับ)",
                "data" => [],
            ], 406);
            //! ./Block by approver_id

            DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->update([
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

            //! Send Mail
            DB::select("call sp_send_mail_to_suspened(?);", [$request->regis_id]);

            //! User Action Logger ********************************************************
            DB::table("tb_transaction_logger")->insert([
                "regis_id"          => $request->regis_id,
                "transaction_desc"  => "Send to suspend",
                "api_endpoint"      => "[PATCH] /approvals-action/send-to-suspend",
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./User Action Logger *******************************************************

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

    //! Block Role OK
    //! Mail OK
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
            $decoded = $jwt->decoded;

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

            // return response()->json($validator->validated());

            // $regis_id = $request->regis_id;

            //! Block by role
            if (!\in_array($decoded->role, ['admin', 'sap-code'])) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สิทธิ์ในการใช้งานไม่ถูกต้อง)",
                "data" => [],
            ], 401);
            //! ./Block by role

            //! Block by status_no
            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [6])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->update([
                "customer_code"             => $request->customer_code,
                "filled_customer_code_at"   => DB::raw("now()"),
                "updated_at"                => DB::raw("now()"),
            ]);

            DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->update([
                "status_no"            => 8, //! ระงับชั่วคราว
            ]);

            //! Send Mail
            DB::select("call sp_send_mail_to_fi(?);", [$request->regis_id]);

            //! User Action Logger ********************************************************
            DB::table("tb_transaction_logger")->insert([
                "regis_id"          => $request->regis_id,
                "transaction_desc"  => "Enter customer code",
                "api_endpoint"      => "[PATCH] /approvals-action/enter-customer-code",
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./User Action Logger *******************************************************

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

    //! Mail OK
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

            //! Block by approver_id
            // ,fn_find_index_in_approvals(regis_id, order_no) as index"
            $result = DB::table("vw_current_approvers")->selectRaw(
                "regis_id,order_no,max_order,approver_id"
            )->where("regis_id", $request->regis_id)->where("approver_id", $decoded->user_id)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (คุณไม่มีสิทธิในการไม่อนุมัติ)",
                "data" => [],
            ], 406);
            //! ./Block by approver_id

            $orderNo = $result[0]->order_no;

            // $result = DB::select("call sp_approve(?, ?);", [$request->regis_id, $orderNo]);
            DB::select("call sp_reject(?, ?);", [$request->regis_id, $orderNo]);

            //! Comments
            DB::table("tb_assessments_comments")->insert([
                "regis_id"          => $request->regis_id,
                "comments"          => $request->comments,
                "comments_type"     => 'rejected',
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./Comments

            //! Send Mail
            DB::select("call sp_send_mail_to_reject(?, ?);", [$request->regis_id, $orderNo]);

            //! User Action Logger ********************************************************
            DB::table("tb_transaction_logger")->insert([
                "regis_id"          => $request->regis_id,
                "transaction_desc"  => "Rejected",
                "api_endpoint"      => "[PATCH] /approvals-action/reject",
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./User Action Logger *******************************************************

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

    //! Mail OK
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

            //! Block by approver_id
            // ,fn_find_index_in_approvals(regis_id, order_no) as index"
            $result = DB::table("vw_current_approvers")->selectRaw(
                "regis_id,order_no,max_order,approver_id"
            )->where("regis_id", $request->regis_id)->where("approver_id", $decoded->user_id)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (คุณไม่มีสิทธิในการอนุมัติ)",
                "data" => [],
            ], 406);
            //! ./Block by approver_id

            $orderNo = $result[0]->order_no;
            // $index = $result[0]->index;

            //! Send Mail (Before sp_approve for sp_send_mail_to_approve_v2)

            // $result = DB::select("call sp_approve(?, ?);", [$request->regis_id, $orderNo]);
            DB::select("call sp_approve(?, ?);", [$request->regis_id, $orderNo]);

            //! Send Mail
            DB::select("call sp_send_mail_to_approve(?, ?);", [$request->regis_id, $orderNo]);

            //! Log
            //! User Action Logger ********************************************************
            DB::table("tb_transaction_logger")->insert([
                "regis_id"          => $request->regis_id,
                "transaction_desc"  => "Approved",
                "api_endpoint"      => "[PATCH] /approvals-action/approve",
                "creator_id"        => $decoded->user_id,
            ]);
            //! ./User Action Logger *******************************************************

            return response()->json([
                "status" => "success",
                "message" => "อนุมัติสำเร็จ",
                // "data" => [["regis_id" => $request->regis_id, "order_no" => $orderNo]],
                // "data" => $result,
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
