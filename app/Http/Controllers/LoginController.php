<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use App\Models\Login;
use Illuminate\Support\Facades\DB;

class LoginController extends Controller
{
    private $jwtUtils;

    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    // Login
    function login(Request $request)
    {
        try {
            $validators = Validator::make(
                $request->all(),
                [
                    'username' => 'required|string',
                    'password' => 'required|string|min:1|max:255',
                ]
            );

            if ($validators->fails()) {
                return response()->json([
                    "status" => "error",
                    "message" => "Bad request",
                    "data" => [
                        [
                            "validator" => $validators->errors()
                        ]
                    ]
                ], 400);
            }

            // $validator->validated() = {"username": "x","password":"x"}
            $username = $validators->validated()["username"];
            $password = $validators->validated()["password"];


            //! Check LDAP Login
            $ldapServer = 'snc-former.com';
            $ldapConnect = \ldap_connect($ldapServer);
            if (!$ldapConnect) return response()->json([
                "status" => "error",
                "message" => "Error in LDAP Connection",
                "data" => []
            ]);

            $userLDAP = $username . '@' . $ldapServer;
            $ldapLogin = @\ldap_bind($ldapConnect, $userLDAP, $password);
            if (!$ldapLogin) return response()->json([
                "status" => "error",
                "message" => "No username or password in LDAP",
                "data" => []
            ]);

            $user = DB::table("dev_accounts")->where('username', $username)->take(1)->get();
            // return response()->json($user);
            // $user = Login::where('username', $username)->take(1)->get();
            // if username doesn't exist
            if (\count($user) == 0) return response()->json([
                "status" => "error",
                "message" => "There is no user with this account in the iCRS system",
                "data" => []
            ]);



            // // if password doesn't match
            // $pass = Login::where('password', $password) -> where('username', $username) -> take(1) -> get();
            // // if username doesn't exist
            // if (\count($pass) == 0) return response() -> json([
            //     "status" => "error",
            //     "message" => "password incorect",
            //     "data" => []
            // ]);

            \date_default_timezone_set('Asia/Bangkok');
            $dt = new \DateTime();
            // return response()->json(["user" => $user, "type" => gettype(json_decode($user[0]->name))]);
            $name = json_decode($user[0]->name);
            // return response()->json(["name" => $name->en, "type" => gettype($name->en)]);
            // return response()->json(["user" => $user[0]->username, "type" => gettype($user[0]->username)]);
            $payload = array(
                "account_id" => $user[0]->account_id,
                "username" => $username,
                "name" => $name->en,
                // "pass" => $pass[0] -> pass,
                "iat" => $dt->getTimestamp(),
                "exp" => $dt->modify('+ 3hours')->getTimestamp(),
            );
            // return response()->json(["payload" => $payload, "type" => gettype($payload)]);

            $token = $this->jwtUtils->generateToken($payload);

            return response()->json([
                "status" => "success",
                "message" => "Login success",
                "data" => [
                    [
                        "username" => $username,
                        "name" => $name,
                        "token" => $token,
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ], 500);
        }
    }

    function createUser(Request $request)
    {
        try {
            $rules = [
                "username" => "required|string",
                "name.en" => "required|string",
                "name.th" => "required|string",
            ];

            $validator = Validator::make($request->all(), $rules);

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


            $username   = $validator->validated()["username"];
            $name       = $validator->validated()["name"];

            $result = DB::table("dev_accounts")->insert([
                "username"  => $username,
                // "name"      => json_encode($name, JSON_UNESCAPED_UNICODE),
                "name"      => json_encode($name),
            ]);

            // return response()->json(["name" => $name, "type" => gettype($name)]);
            return response()->json(["result" => $result]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ], 500);
        }
    }
}
