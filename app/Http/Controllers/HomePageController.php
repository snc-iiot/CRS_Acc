<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\HomePage;

class LoginController extends Controller
{
    private $jwtUtils;

    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    function addInformation(Request $request)
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

            $validator = Validator::make(
                $request->all(),
                [
                    'username'     => 'required|string|min:1|max:255',
                    // 'meeting_datetime'   => 'required|datetime',
                    'room_id'    => 'required|integer|min:1|max:15',
                    'event'    => 'required|string|min:7|max:15',
                    // 'nameplate_info' => 'required|object'
                ]
            );

            $username = $request->username;
            $meeting_datetime = $request->meeting_datetime;
            $room_id = $request->room_id;
            $event = $request->event;
            $nameplate_info = $request->nameplate_info;

            if ($validator->fails()) {
                return response()->json([
                    "status" => "error",
                    "message" => "Bad request",
                    "data" => [
                        [
                            "validator" => $validator->errors()
                        ]
                    ]
                ], 400);
            }

            $result = HomePage::insert([
                "username" => $username,
                // "meeting_datetime" => $meeting_datetime,
                "room_id" => $room_id,
                "event" => $event,
                // "nameplate_info" => $nameplate_info,
            ]);

            return response()->json([
                "status" => 'success',
                "message" => "Added device successfully",
                "data" => [
                    [
                        "result" => $result
                    ]
                ],
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
