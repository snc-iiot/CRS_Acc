<?php

namespace App\Http\Controllers;

class HomePageController extends Controller
{
    function index()
    {
        return response()->json(["message" => "Hello"]);
    }
}
