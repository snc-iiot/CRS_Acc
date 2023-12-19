<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

// use Illuminate\Http\Request;

class JsonTemplateController extends Controller
{
    function uploadDocumentsTemplate()
    {
        return response()->json([
            "status" => "success",
            "message" => "OK",
            "data" => [
                [
                    "anti_corruption_policy" => "",
                    "vat_license" => "",
                    "business_registration" => "",
                    "fi_statement" => "",
                    "invoice" => "",
                    "organization_chart" => "",
                    "sale_contract" => "",
                    "factory_visit" => "",
                    "machine_condition" => "",
                    "company_map" => "",
                    "other_document1" => "",
                    "other_document2" => "",
                    "other_document3" => ""
                ]
            ]
        ]);
    }

    function certifications()
    {
        try {
            $key = "/template/certifications";
            $cached = Cache::get($key);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_certifications")->select(["cer_id", "cer_name_th", "cer_name_en"])->orderBy("created_at")->get();
            Cache::put($key, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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

    function benefits()
    {
        try {
            $key = "/template/benefits";
            $cached = Cache::get($key);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_benefits")->select(["cer_id", "cer_name_th", "cer_name_en"])->orderBy("created_at")->get();
            Cache::put($key, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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


    function deliveryTerms()
    {
        try {
            $key = "/template/delivery-terms";
            $cached = Cache::get($key);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_delivery_terms")->select(["cer_id", "cer_name_th", "cer_name_en"])->orderBy("created_at")->get();
            Cache::put($key, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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

    function companyPolicy()
    {
        try {
            $key = "/template/company-policy";
            $cached = Cache::get($key);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_company_policy")->select(["cer_id", "cer_name_th", "cer_name_en"])->orderBy("created_at")->get();
            Cache::put($key, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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

    function allCompany()
    {
        try {
            $key = "/template/all-company";
            $cached = Cache::get($key);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_all_company")->select(["company", "company_full_name_th", "company_full_name_en"])->orderBy("created_at")->get();
            Cache::put($key, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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
