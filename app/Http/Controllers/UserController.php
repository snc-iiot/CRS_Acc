<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
// use App\Models\Login;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Cache;

class UserController extends Controller
{
    private $jwtUtils;

    public function __construct()
    {
        $this->jwtUtils = new JWTUtils();
    }

    //TODO [POST] /user/login
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
                    "message" => "การร้องขอล้มเหลว",
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
                "message" => "การเชื่อมต่อ LDAP ผิดพลาด",
                "data" => []
            ], 500);

            $userLDAP = $username . '@' . $ldapServer;
            $ldapLogin = @\ldap_bind($ldapConnect, $userLDAP, $password);
            if (!$ldapLogin) return response()->json([
                "status" => "error",
                "message" => "ไม่มีข้อมูลผู้ใช้นี้อยู่ในระบบ LDAP",
                "data" => []
            ], 400);

            $user = DB::table("tb_users")->where('username', $username)->take(1)->get();
            if (\count($user) == 0) return response()->json([
                "status" => "error",
                "message" => "ไม่มีข้อมูลผู้ใช้นี้อยู่ในระบบ iCRS",
                "data" => []
            ], 400);

            \date_default_timezone_set('Asia/Bangkok');
            $dt = new \DateTime();
            $name = \json_decode($user[0]->name);
            $company = \json_decode($user[0]->company);
            $payload = array(
                "user_id" => $user[0]->user_id,
                "username" => $username,
                "name" => $name->en,
                "company" => $company,
                "iat" => $dt->getTimestamp(),
                "exp" => $dt->modify('+ 3000hours')->getTimestamp(),
            );
            // return response()->json(["payload" => $payload, "type" => gettype($payload)]);

            $token = $this->jwtUtils->generateToken($payload);

            return response()->json([
                "status" => "success",
                "message" => "เข้าสู่ระบบสำเร็จ",
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

    //TODO [POST] /user/create-user
    function createUser(Request $request)
    {
        try {
            $rules = [
                "username"  => "required|string",
                "name.en"   => "required|string",
                "name.th"   => "required|string",
                "company"   => "required|array|min:1",
                "company.*" => "required|distinct|string|min:1",
                "role"      => "required|string",
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

            $username   = $validator->validated()["username"];
            $name       = $validator->validated()["name"];
            $company    = $validator->validated()["company"];
            $role       = $validator->validated()["role"];

            $result = DB::table("tb_users")->where("username", $username)->take(1)->get();
            if (\count($result) != 0) return response()->json([
                "status" => "error",
                "message" => "ผู้ใช้งานมีในระบบอยู่แล้ว",
                "data" => []
            ], 400);

            $data = [
                "username"  => $username,
                // "name"      => json_encode($name, JSON_UNESCAPED_UNICODE),
                "name"      => \json_encode($name, JSON_UNESCAPED_UNICODE),
                "company"   => \json_encode($company, JSON_UNESCAPED_UNICODE),
                "role"      => $role,
            ];

            // return response()->json($validator->validated());

            $result = DB::table("tb_users")->insert($data);

            // return response()->json(["name" => $name, "type" => gettype($name)]);
            return response()->json([
                "status" => "success",
                "message" => "สร้างผู้ใช้งานสำเร็จ",
                "data" => [
                    ["result" => $result]
                ]
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ], 500);
        }
    }

    function putCache(Request $request)
    {
        try {
            Cache::put("/icrs/test", $request->value);
            return response()->json([
                "status" => "success",
                "message" => "OK",
                "data" => []
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ]);
        }
    }

    function setCache(Request $request)
    {
        try {
            Redis::set("/icrs/test", $request->value);
            return response()->json([
                "status" => "success",
                "message" => "OK",
                "data" => []
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ]);
        }
    }

    function pullCache()
    {
        try {
            $value = Cache::pull("/icrs/test");
            return response()->json([
                "status" => "success",
                "message" => "OK",
                "data" => [["value" => $value]]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ]);
        }
    }

    function getCache()
    {
        try {
            $value = Redis::get("/icrs/test");
            return response()->json([
                "status" => "success",
                "message" => "OK",
                "data" => [["value" => $value]]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ]);
        }
    }

    function pubRedis(Request $request)
    {
        try {
            // $result = Redis::command("publish", ["/icrs/test", $request->value]);
            $result = Redis::publish("/icrs/test", \json_encode([
                "value" => $request->value,
                "name" => $request->name,
            ]));
            return response()->json([
                "status" => "success",
                "message" => "OK",
                "data" => [["result" => $result]]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error",
                "message" => $e->getMessage(),
                "data" => []
            ]);
        }
    }
}
