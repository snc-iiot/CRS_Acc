<?php

namespace App\Http\Controllers;

use App\Http\Libraries\JWT\JWTUtils;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{
     private $jwtUtils;

     public function __construct()
     {
          $this->jwtUtils = new JWTUtils();
     }

     function login(Request $request)
     {
          try {
               $validator = Validator::make(
                    $request->all(),
                    [
                         'username'     => 'required|string',
                         'password'     => 'required|string|min:1|max:255',
                    ]
               );

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
               //!user, admin, approver

               // $validator->validated() = {"username": "x","password":"x"}
               $validated = (object)$validator->validated();
               $username = $validated->username;
               $password = $validated->password;

               // //! Check LDAP Login
               // $ldapServer = 'snc-former.com';
               // $ldapConnect = \ldap_connect($ldapServer);
               // if (!$ldapConnect) return response()->json([
               //      "status" => "error",
               //      "message" => "Error in LDAP Connection",
               //      "data" => []
               // ]);

               // $userLDAP = $username . '@' . $ldapServer;
               // $ldapLogin = @\ldap_bind($ldapConnect, $userLDAP, $password);
               // if (!$ldapLogin) return response()->json([
               //      "status" => "error",
               //      "message" => "No username or password in LDAP",
               //      "data" => []
               // ]);

               //! Check iCRS Login
               // $user = $this->usersModel->where('username', $username)->first()->get();
               $user = User::where('user_name', $user_name)->take(1)->get();
               if (\count($user) == 0) return response()->json([
                    "status" => "error",
                    "message" => "There is no user with this account in the iCRS system",
                    "data" => []
               ]);

               // \date_default_timezone_set('Asia/Bangkok');
               $dt = new \DateTime();
               // return response()->json(["datetime" => $dt->format('Y-m-d H:i:s')]);
               // $dt2 = clone $dt;
               $payload = array(
                    "account_id" => $user[0]->account_id,
                    "name" => $user[0]->name,
                    "user_name" => $user[0]->user_name,
                    "iat" => $dt->getTimestamp(),
                    // "nbf" => $dt2->modify('+ 30minutes')->getTimestamp(),
                    "exp" => $dt->modify('+ 3hours')->getTimestamp(),
               );

               $token = $this->jwtUtils->generateToken($payload);
               return response()->json([
                    'status' => 'success',
                    'message' => 'Login success',
                    'data' => [
                         [
                              "user_id"      => $user[0]->user_id,
                              "name"         => $user[0]->name,
                              "role"         => $user[0]->role,
                              "token"        => $token,
                         ]
                    ]
               ]);
          } catch (\Exception $e) {
               return response()->json(["status" => "error", "message" => $e->getMessage(), "data" => []], 500);
          }
     }

     function test1()
     {
          // $users = DB::select('select * from accounts;');
          // return response()->json(["users" => $users]);

          // $users = $this->usersModel->take(10)->get();
          $users = User::take(10)->get();
          return response()->json(["users" => $users]);
     }

     function test()
     {
          return response()->json(["message" => "Hello"]);
     }

     function createUser(Request $request)
     {
          try {
               $validator = Validator::make(
                    $request->all(),
                    [
                         'name'     => 'required|string|min:1|max:255',
                         'username'   => 'required|string|min:1|max:255',
                         'role'    => 'required|string',
                    ]
               );
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

               $validated = (object)$validator->validated();
               $name     = $validated->name;
               $username = $validated->username;
               $role     = $validated->role;
               $user = DB::table('users')->insert([
                    'name' => $name,
                    'username' => $username,
                    'role' => $role,
               ]);
               return response()->json([
                    'status' => 'error',
                    'message' => 'Created user successfully',
                    'data' => [
                         [
                              'user' => $user
                         ]
                    ]
               ]);
          } catch (\Exception $e) {
               return response()->json([
                    'status' => 'error',
                    'message' => $e->getMessage(),
                    'data' => []
               ], 500);
          }
     }
}
