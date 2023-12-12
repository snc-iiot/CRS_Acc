<?php

namespace App\Http\Controllers;

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
}
