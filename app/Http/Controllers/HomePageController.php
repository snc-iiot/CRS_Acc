<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;

class HomePageController extends Controller
{
    function index()
    {
        return response()->json(["message" => "Hello"]);
    }

    function generateUUIDV4()
    {
        $uuid = Str::uuid()->toString();
        return response()->json(["uuid" => $uuid]);
    }
}
