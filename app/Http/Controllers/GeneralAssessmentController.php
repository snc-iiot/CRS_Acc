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

class GeneralAssessmentController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    //TODO [POST] /general-assessment (create)
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
                "regis_id"                  => "required|uuid|string",
                "products"                  => "required|string",
                "quantity_per_year"         => "required|integer|min:0",
                "orders"                    => "required|integer|min:0",
                "lead_time"                 => "required|integer|min:0",

                "price_conditions.peroid"   => "required|string",
                "price_conditions.value"    => "required|integer|min:0",

                "machine_produce.*.id"          => "required|string",
                "machine_produce.*.label_th"    => "required|string",
                "machine_produce.*.label_en"    => "required|string",
                "machine_produce.*.is_checked"  => "required|boolean",
                "machine_produce.*.value"       => "nullable",
                // "machine_produce.*.value.amount"    => "required_if:mold_use.*.value!=null|integer|min:0",
                // "machine_produce.*.value.ROI"       => "required_if:mold_use.*.value!=null|integer|min:0",
                // "machine_produce.*.value.ROA"       => "required_if:mold_use.*.value!=null|integer|min:0",
                // "machine_produce.*.value.payback"   => "required_if:mold_use.*.value!=null|integer|min:0",

                "mold_use.*.id"          => "required|string",
                "mold_use.*.label_th"    => "required|string",
                "mold_use.*.label_en"    => "required|string",
                "mold_use.*.is_checked"  => "required|boolean",
                "mold_use.*.value"       => "nullable",
                // "mold_use.*.value.amount"    => "required_if:mold_use.*.value!=null|integer|min:0",
                // "mold_use.*.value.ROI"       => "required_if:mold_use.*.value!=null|integer|min:0",
                // "mold_use.*.value.ROA"       => "required_if:mold_use.*.value!=null|integer|min:0",
                // "mold_use.*.value.payback"   => "required_if:mold_use.*.value!=null|integer|min:0",

                "main_material.*.id"          => "required|string",
                "main_material.*.label_th"    => "required|string",
                "main_material.*.label_en"    => "required|string",
                "main_material.*.is_checked"  => "required|boolean",
                "main_material.*.value"       => "nullable|string",

                "transport_distance.transport"  => "required|string",
                "transport_distance.origin"     => "required|string",
                "transport_distance.destination" => "required|string",
                "transport_distance.distance" => "required|numeric|min:0",
                "transport_distance.car_type" => "nullable|string",
                "transport_distance.fuel_type" => "nullable|string",
                "transport_distance.shipping_cost" => "required|numeric|min:0",

                "main_supplier_credit_terms.*.supplier_name" => "required|string",
                "main_supplier_credit_terms.*.ratio" => "required|integer|min:0|max:100",
                "main_supplier_credit_terms.*.credit_terms" => "required|integer|min:0",
                "main_supplier_credit_terms.*.country.label" => "required|string",
                "main_supplier_credit_terms.*.country.value" => "required|string",

                "main_mat_ratio.thailand" => "required|integer|min:0|max:100",
                "main_mat_ratio.foreign" => "required|integer|min:0|max:100",

                "ratio_of_raw_mat.RM" => "required|numeric|min:0",
                "ratio_of_raw_mat.COGS" => "required|numeric|min:0",
                "ratio_of_raw_mat.GP" => "required|numeric|min:0",

                "inventory_day.RM" => "required|numeric|min:0",
                "inventory_day.PRD" => "required|numeric|min:0",
                "inventory_day.FG" => "required|numeric|min:0",
                "inventory_day.inventory" => "required|numeric|min:0",

                "approvals.*.order_no" => "required|integer|min:1",
                "approvals.*.position" => "required|string",
                "approvals.*.issued_at" => "nullable|string|date_format:Y-m-d H:i:s",
                "approvals.*.issued_by" => "nullable|string",
                "approvals.*.is_approved" => "nullable|boolean",
                "approvals.*.issued_by_id" => "required|uuid",
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
            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->whereIn("status_no", [1])->get();
            // $result = DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->whereIn("status_no", [1])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถแก้ไขข้อมูลการลงทะเบียนได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->update([
                "products" => $request->products,
                "orders" => $request->orders,
                "quantity_per_year" => $request->quantity_per_year,
                "lead_time" => $request->lead_time,
                "price_conditions" => \json_encode($request->price_conditions),
                "machine_produce" => \json_encode($request->machine_produce),
                "mold_use" => \json_encode($request->mold_use),
                "main_material" => \json_encode($request->main_material),
                "transport_distance" => \json_encode($request->transport_distance),
                "main_supplier_credit_terms" => \json_encode($request->main_supplier_credit_terms),
                "main_mat_ratio" => \json_encode($request->main_mat_ratio),
                "ratio_of_raw_mat" => \json_encode($request->ratio_of_raw_mat),
                "inventory_day" => \json_encode($request->inventory_day),
                "approvals" => \json_encode($request->approvals),
                "status_no" => 2, //! รอยืนยันข้อมูลทางการเงิน
                "creator_id" => $decoded->user_id,
                "created_at" => DB::raw("now()"),
                "updated_at" => DB::raw("now()"),
            ]);

            DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->update([
                "status_no"            => 2, //! รอยืนยันข้อมูลทางการเงิน
            ]);

            //! ส่งเมลไปหา บัญชี

            return response()->json([
                "status" => "success",
                "message" => "บันทึกแบบฟอร์มประเมินลูกค้าสำเร็จ",
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

    //? [PUT] /general-assessment (update)
    function update(Request $request)
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
                "regis_id"                  => "required|uuid|string",
                "products"                  => "required|string",
                "quantity_per_year"         => "required|integer|min:0",
                "orders"                    => "required|integer|min:0",
                "lead_time"                 => "required|integer|min:0",

                "price_conditions.peroid"   => "required|string",
                "price_conditions.value"    => "required|integer|min:1",

                "machine_produce.*.id"          => "required|string",
                "machine_produce.*.label_th"    => "required|string",
                "machine_produce.*.label_en"    => "required|string",
                "machine_produce.*.is_checked"  => "required|boolean",
                "machine_produce.*.value"       => "nullable",
                // "machine_produce.*.value.amount"    => "required_if:mold_use.*.value!=null|integer|min:0",
                // "machine_produce.*.value.ROI"       => "required_if:mold_use.*.value!=null|integer|min:0",
                // "machine_produce.*.value.ROA"       => "required_if:mold_use.*.value!=null|integer|min:0",
                // "machine_produce.*.value.payback"   => "required_if:mold_use.*.value!=null|integer|min:0",

                "mold_use.*.id"          => "required|string",
                "mold_use.*.label_th"    => "required|string",
                "mold_use.*.label_en"    => "required|string",
                "mold_use.*.is_checked"  => "required|boolean",
                "mold_use.*.value"       => "nullable",
                // "mold_use.*.value.amount"    => "required_if:mold_use.*.value!=null|integer|min:0",
                // "mold_use.*.value.ROI"       => "required_if:mold_use.*.value!=null|integer|min:0",
                // "mold_use.*.value.ROA"       => "required_if:mold_use.*.value!=null|integer|min:0",
                // "mold_use.*.value.payback"   => "required_if:mold_use.*.value!=null|integer|min:0",

                "main_material.*.id"          => "required|string",
                "main_material.*.label_th"    => "required|string",
                "main_material.*.label_en"    => "required|string",
                "main_material.*.is_checked"  => "required|boolean",
                "main_material.*.value"       => "nullable|string",

                "transport_distance.transport"  => "required|string",
                "transport_distance.origin"     => "required|string",
                "transport_distance.destination" => "required|string",
                "transport_distance.distance" => "required|numeric|min:0",
                "transport_distance.car_type" => "nullable|string",
                "transport_distance.fuel_type" => "nullable|string",
                "transport_distance.shipping_cost" => "required|numeric|min:0",

                "main_supplier_credit_terms.*.supplier_name" => "required|string",
                "main_supplier_credit_terms.*.ratio" => "required|integer|min:0|max:100",
                "main_supplier_credit_terms.*.credit_terms" => "required|integer|min:0",
                "main_supplier_credit_terms.*.country.label" => "required|string",
                "main_supplier_credit_terms.*.country.value" => "required|string",

                "main_mat_ratio.thailand" => "required|integer|min:0|max:100",
                "main_mat_ratio.foreign" => "required|integer|min:0|max:100",

                "ratio_of_raw_mat.RM" => "required|numeric|min:0",
                "ratio_of_raw_mat.COGS" => "required|numeric|min:0",
                "ratio_of_raw_mat.GP" => "required|numeric|min:0",

                "inventory_day.RM" => "required|numeric|min:0",
                "inventory_day.PRD" => "required|numeric|min:0",
                "inventory_day.FG" => "required|numeric|min:0",
                "inventory_day.inventory" => "required|numeric|min:0",
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
            $result = DB::table("tb_regis_informations as t1")->selectRaw("t1.regis_id, t2.approvals")->leftJoin(
                "tb_general_assessments as t2",
                "t1.regis_id",
                "=",
                "t2.regis_id"
            )->where("t1.regis_id", $request->regis_id)->whereIn("t1.status_no", [3])->get();
            // $result = DB::table("tb_regis_informations")->where("regis_id", $regis_id)->whereIn("status_no", [3])->get();
            // $result = DB::table("tb_general_assessments")->select(["approvals"])->where("regis_id", $request->regis_id)->whereIn("status_no", [3])->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่สามารถทำรายการได้ (สถานะไม่ถูกต้อง)",
                "data" => [],
            ], 406);
            //! ./Block by status_no

            $approvals = array();
            if ($result[0]->approvals != "null") {
                $approvals = \json_decode($result[0]->approvals);
                foreach ($approvals as $item) {
                    $item->is_approved = null;
                    $item->issued_at = null;
                }
            }

            DB::table("tb_general_assessments")->where("regis_id", $request->regis_id)->update([
                "products" => $request->products,
                "orders" => $request->orders,
                "quantity_per_year" => $request->quantity_per_year,
                "lead_time" => $request->lead_time,
                "price_conditions" => \json_encode($request->price_conditions),
                "machine_produce" => \json_encode($request->machine_produce),
                "mold_use" => \json_encode($request->mold_use),
                "main_material" => \json_encode($request->main_material),
                "transport_distance" => \json_encode($request->transport_distance),
                "main_supplier_credit_terms" => \json_encode($request->main_supplier_credit_terms),
                "main_mat_ratio" => \json_encode($request->main_mat_ratio),
                "ratio_of_raw_mat" => \json_encode($request->ratio_of_raw_mat),
                "inventory_day" => \json_encode($request->inventory_day),
                "approvals" => \count($approvals) == 0 ? null : \json_encode($approvals),
                "status_no" => 2, //! รอตรวจสอบข้อมูล
                "is_acc_cf" => false,
                "acc_cf_at" => null,
                "updated_at" => DB::raw("now()"),
            ]);


            DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->update([
                "status_no"            => 2, //! รอตรวจสอบข้อมูล
            ]);

            //! ส่งเมลไปหา บัญชี

            return response()->json([
                "status" => "success",
                "message" => "แก้ไขแบบฟอร์มประเมินลูกค้าสำเร็จ",
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

    //* [GET] /general-assessment/form-by-id?regis_id=<uuid>
    function getFormByID(Request $request)
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

            $userID = $decoded->user_id;

            $result = DB::table("tb_general_assessments as t1")->selectRaw(
                "t1.regis_id,
                t1.products,
                t1.orders,
                t1.quantity_per_year,
                t1.lead_time,
                t1.price_conditions,
                t1.machine_produce,
                t1.mold_use,
                t1.main_material,
                t1.transport_distance,
                t1.main_supplier_credit_terms,
                t1.main_mat_ratio,
                t1.ratio_of_raw_mat,
                t1.inventory_day,
                t1.approvals,
                t1.is_acc_cf,
                t1.acc_cf_at::varchar(19) as acc_cf_at,
                t1.customer_code,
                t1.filled_customer_code_at::varchar(19) as filled_customer_code_at,
                t1.creator_id,
                t1.created_at::varchar(19) as created_at,
                t1.updated_at::varchar(19) as updated_at,
                t2.status_no,
                t3.status_desc_th,
                (case when v1.approver_id is null then false 
                when v1.approver_id='$userID'::uuid then true 
                else false end) as is_approver"
            )->leftJoin(
                "tb_regis_informations as t2",
                "t1.regis_id",
                "=",
                "t2.regis_id"
            )->leftJoin("tb_all_status as t3", "t2.status_no", "=", "t3.status_no")
                ->leftJoin("vw_current_approvers as v1", "t1.regis_id", "=", "v1.regis_id")
                ->where("t1.regis_id", $request->regis_id)->get();

            foreach ($result as $row) {
                $row->price_conditions              = \json_decode($row->price_conditions);
                $row->machine_produce               = \json_decode($row->machine_produce);
                $row->mold_use                      = \json_decode($row->mold_use);
                $row->main_material                 = \json_decode($row->main_material);
                $row->transport_distance            = \json_decode($row->transport_distance);
                $row->main_supplier_credit_terms    = \json_decode($row->main_supplier_credit_terms);
                $row->main_mat_ratio                = \json_decode($row->main_mat_ratio);
                $row->ratio_of_raw_mat              = \json_decode($row->ratio_of_raw_mat);
                $row->inventory_day                 = \json_decode($row->inventory_day);
                $row->approvals                     = \is_null($row->approvals) ? null : \json_decode($row->approvals);
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

    //* [GET] /general-assessment/approvals-by-id
    function getApprovalsByID(Request $request)
    {
        try {
            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
                "data" => [],
            ], 401);

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

            // return response()->json($validator->validated());

            $result = DB::table("tb_regis_informations")->where("regis_id", $request->regis_id)->selectRaw("company_information->>'company_admin' as company_admin")->take(1)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่พบ regis_id นี้ในระบบ",
                "data" => []
            ], 400);

            $companyAdmin = $result[0]->company_admin;
            $result = DB::table("vw_approvals_setting")->where("company_group", $companyAdmin)->select(["approvals_set_id", "company_group", "business_unit", "approvals"])->get();

            foreach ($result as $row) {
                $row->approvals = \json_decode($row->approvals);
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
