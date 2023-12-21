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

    //TODO [POST] /general-assessment
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

            $rules = [
                "regis_info_id"             => "required|uuid|string",
                "products"                  => "required|string",
                "orders"                    => "required|integer|min:0",
                "lead_time"                 => "required|integer|min:0",

                "price_conditions.peroid"   => "required|string",
                "price_conditions.value"    => "nullable|string",

                "machine_produce.*.id"          => "required|string",
                "machine_produce.*.label_th"    => "required|string",
                "machine_produce.*.label_en"    => "required|string",
                "machine_produce.*.is_checked"  => "required|boolean",
                "machine_produce.*.value"       => "nullable",
                "machine_produce.*.value.amount"    => "required|integer|min:0",
                "machine_produce.*.value.ROI"       => "required|integer|min:0",
                "machine_produce.*.value.ROA"       => "required|integer|min:0",
                "machine_produce.*.value.payback"   => "required|integer|min:0",

                "mold_use.*.id"          => "required|string",
                "mold_use.*.label_th"    => "required|string",
                "mold_use.*.label_en"    => "required|string",
                "mold_use.*.is_checked"  => "required|boolean",
                "mold_use.*.value"       => "nullable",
                "mold_use.*.value.amount"    => "required|integer|min:0",
                "mold_use.*.value.ROI"       => "required|integer|min:0",
                "mold_use.*.value.ROA"       => "required|integer|min:0",
                "mold_use.*.value.payback"   => "required|integer|min:0",

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

            $rules = ["regis_info_id" => "required|uuid|string"];

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

            $result = DB::table("tb_regis_informations")->where("regis_info_id", $request->regis_info_id)->selectRaw("company_information->>'company_admin' as company_admin")->take(1)->get();
            if (\count($result) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่พบ regis_info_id นี้ในระบบ",
                "data" => []
            ], 400);

            return response()->json([
                "status" => "success",
                "message" => "Data from Query",
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
