<?php

namespace App\Http\Libraries\JWT;

// use App\Http\Libraries\JWT\JWT;
// use App\Http\Libraries\JWT\Key;

// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;

define("PRIVATE_KEY", "-----BEGIN RSA PRIVATE KEY-----
MIIBPAIBAAJBALIGxbI73ZGhiOoXU06eH1IOovITM20Pkr5o6+4hN5hCyk6taPD8
7yKK+64e19xnxMcESpavG12sjgt4eOT2uJMCAwEAAQJBAKWTuugM2gUK8qaWzzq9
wm+1gUQZK6lx5JAIUfcHGggX+CleJnlRy+FVtKJ4c9wrDEh3ek3nDt6Yj/5ZvBF+
4TECIQDo2AfBpdBCT04+xxHEiM7SgCyk5+X6I5Wa1MOmGTEWRwIhAMO7JV1G7E+b
qoPEOrw8LNBte3tKq+DnIsZDPW1fNZVVAiEAhWKT9uvtBL93nGDfnc2dZVsFuCYc
SZIu9rZhqfoOc6sCIQCF1NHAjL0J1ctqm2L50D9oKGP1MmKBvij13YYD4cTWnQIg
X9fM+3UY9owZkcHaVENwocdbOiNOPjZ1dEB2RcD45/E=
-----END RSA PRIVATE KEY-----");
// define("PRIVATE_KEY", env('JWT_SECRET'));

class JWTUtils
{
     public function generateToken($payload)
     {
          $token = JWT::encode($payload, PRIVATE_KEY, 'HS256');
          return $token;
     }

     public function verifyToken($header)
     {
          $token = null;
          // extract the token from the header
          if (!empty($header)) {
               if (preg_match('/Bearer\s(\S+)/', $header, $matches)) {
                    $token = $matches[1];
               }
          }

          // check if token is null or empty
          if (is_null($token) || empty($token)) {
               return (object)['state' => false, 'msg' => 'Access denied', 'decoded' => []];
          }

          try {
               $decoded = JWT::decode($token, new Key(PRIVATE_KEY, 'HS256'));
               return (object)['state' => true, 'msg' => 'OK', 'decoded' => $decoded];
          } catch (\Exception $e) {
               return (object)['state' => false, 'msg' => $e->getMessage(), 'decoded' => []];
          }
     }
}
