<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
// use App\Rules\Base64;
use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Validator;
// use App\Models\Company;
// use App\Models\Documents;
use Illuminate\Support\Facades\DB;
// use Illuminate\Support\Str;

class DashboardController extends Controller
{
    private $jwtUtils;
    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    //* [GET] /dashboard/main-customer-ratio (read)
    function mainCustomerRatio(Request $request)
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

            // $result = DB::table("vw_main_customer_ratio")->get();
            $result = DB::table("tb_regis_informations")->selectRaw(
                "distinct on (payment_term->'main_customer'->>'name')
                payment_term->'main_customer'->>'name' as main_customer
                ,count(*) over (partition by payment_term->'main_customer'->>'name') as amount"
            )->whereIn("status_no", [6, 8])->get();

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

    //* [GET] /dashboard/regis-count (read)
    function regisCount(Request $request)
    {
        try {

            $header = $request->header('Authorization');
            $jwt = $this->jwtUtils->verifyToken($header);
            if (!$jwt->state) return response()->json([
                "status" => "error",
                "message" => "Unauthorized",
                "data" => [],
            ], 401);

            $request->all();

            $data = DB::table("vw_company_regis_count")->get();

            return response()->json([
                "status" => "success",
                "message" => "Data from query",
                "data" => $data
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ], 500);
        }
    }

    //* [GET] /dashboard/share-holder-ratio (read)
    function shareHolderRatio(Request $request)
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

            $result = DB::table("vw_share_holder_ratio_sum")->get();

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

    //* [GET] /dashboard/objective-purchasing-ratio (read)
    function objectivePurchasingRatio(Request $request)
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

            // $result = DB::table("vw_objective_purchasing_ratio")->get();
            $result = DB::table("tb_regis_informations")->selectRaw(
                "distinct on (payment_term->'objective_purchasing'->>'name')
                payment_term->'objective_purchasing'->>'name' as objective_purchasing
                ,count(*) over (partition by payment_term->'objective_purchasing'->>'name') as amount"
            )->whereIn("status_no", [6, 8])->get();

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

    //* [GET] /dashboard/regis-stat (read)
    function regisStat(Request $request)
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

            $result = DB::table("tb_regis_informations")->selectRaw(
                "company_information->>'province' as province
                ,count(*) as amount"
            )->whereIn("status_no", [6, 8])->groupByRaw("company_information->>'province'")->get();

            return response()->json([
                "status" => "success",
                "message" => "Data from query",
                "data" => $result,
                // "data" => [],
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
