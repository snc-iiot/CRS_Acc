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
                    "other_document3" => "",

                    //! Certifications
                    "iso_14064_1_2018" => "",
                    "iso_14001_2015" => "",
                    "iso_26000" => "",
                    "iso_iec_17025_2017" => "",
                    "iso_9001" => "",
                    "ohsas_18001_2007" => "",
                    "iaft_16949_2016" => "",
                    "tls_8001_2003" => "",
                    "tis_18001_1999" => "",
                    "cbam_certificates" => "",
                    "energy_saving_label_number_5" => "",
                    "green_industry_symbol" => "",
                    "fsc_symbol" => "",
                    "carbon_reduction_label" => "",
                    "green_industry_certification" => "",
                    "green_label" => "",
                    "certification_other" => "",

                    //! Benefits
                    "boi" => "",
                    "free_zone" => "",
                    "jtepa" => "",
                    "benefits_others" => "",

                    //! Internal
                    "bom_process" => "",
                    "cost_break_down" => "",
                    "quotation" => "",
                    "internal_other1" => "",
                    "internal_other2" => "",
                    "internal_other3" => "",
                ]
            ]
        ]);
    }

    function certifications()
    {
        try {
            $cacheKey = "/template/certifications";
            $cached = Cache::get($cacheKey);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_certifications")->select(["cer_id", "cer_name_th", "cer_name_en"])->orderBy("created_at")->get();

            foreach ($result as $row) {
                $row->is_checked = false;
                $row->value = "";
                $row->exp = "";
            }
            Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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
            $cacheKey = "/template/benefits";
            $cached = Cache::get($cacheKey);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_benefits")->select(["cer_id", "cer_name_th", "cer_name_en"])->orderBy("created_at")->get();

            foreach ($result as $row) {
                $row->is_checked = false;
                $row->value = "";
                $row->exp = "";
            }
            Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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
            $cacheKey = "/template/delivery-terms";
            $cached = Cache::get($cacheKey);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_delivery_terms")->select(["cer_id", "cer_name_th", "cer_name_en"])->orderBy("created_at")->get();

            foreach ($result as $row) {
                $row->is_checked = false;
                $row->value = "";
                $row->exp = "";
            }
            Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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
            $cacheKey = "/template/company-policy";
            $cached = Cache::get($cacheKey);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_company_policy")->select(["cer_id", "cer_name_th", "cer_name_en"])->orderBy("created_at")->get();

            foreach ($result as $row) {
                $row->is_checked = false;
                $row->value = "";
                $row->exp = "";
            }
            Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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

    function businessTypes()
    {
        try {
            $cacheKey = "/template/business-types";
            $cached = Cache::get($cacheKey);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_business_types")->select(["business_type_id", "business_type"])->orderBy("created_at")->get();

            foreach ($result as $row) {
                // $row->is_checked = false;
                $row->value = "";
                // $row->exp = "";
            }
            Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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
            $cacheKey = "/template/all-company";
            $cached = Cache::get($cacheKey);
            if (!\is_null($cached)) {
                return response()->json([
                    "status" => "success",
                    "message" => "Data from cached",
                    "data" => \json_decode($cached),
                ]);
            }
            $result = DB::table("tb_all_company")->select(["company", "company_full_name_th", "company_full_name_en"])->orderBy("created_at")->get();
            Cache::put($cacheKey, \json_encode($result), \DateInterval::createFromDateString('24 hours'));

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
