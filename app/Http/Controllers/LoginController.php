<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Login;

class LoginController extends Controller
{
    private $jwtUtils;

    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    function login(Request $request)
    {
        try {
            $validators = Validator::make(
                $request -> all(),
                [
                    'user_name' => 'required | string',
                    'password' => 'required | string | min:1 | max:255',
                ]
            );

            if ($validators -> fails()) {
                return response()->json([
                    "status" => "error",
                    "message" => "Bad request",
                    "data" => [
                        [
                            "validator" => $validators -> errors()
                        ]
                    ]
                        ], 400);
            }

            // $validator->validated() = {"username": "x","password":"x"}
            $validated = (object)$validators -> validated();
            $user_name = $validated -> user_name;
            $password = $validated -> password;

            // Check iCRS login
            $user = Login::where('user_name', $user_name) -> take(1) -> get();
            // if username doesn't exist
            if (\count($user) == 0) return response() -> json([
                "status" => "error",
                "message" => "There is no user with this account in the iCRS system",
                "data" => []
            ]);

            $dt = new \DateTime();
            $payload = array(
                "user_name" => $user[0] -> user_name,
                "name" => $user[0] -> user,
                "iat" => $dt -> getTimestamp(),
                "exp" => $dt -> modify('+ 1hours') -> getTimestamp(),
            );

            $token = $this->jwtUtils -> generateToken($payload);
            return response() -> json([
                "status" => "success",
                "message" => "Login success",
                "data" => [
                    [
                        "user_name" => $user[0] -> user_name,
                        "name" => $user[0] -> name,
                        "token" => $token,
                    ]
                ]
            ]);

        } catch (\Exception $e){
            return response() -> json([
                "status" => "error",
                "message" => $e -> getMessage(),
                "data" => []] , 500);
        }
    }
}
