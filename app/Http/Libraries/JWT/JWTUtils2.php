<?php

namespace App\Http\Libraries\JWT;

// use App\Http\Libraries\JWT\JWT;
// use App\Http\Libraries\JWT\Key;

// use Firebase\JWT\JWT;
// use Firebase\JWT\Key;

define("PRIVATE_KEY2", "-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJAUhqMAodaG4IG+WBONMckSGAeiFG7PLLquN00fRIxpvqaz2GOLfe7
ijHrzUAVzs7rs0/oOK+QqZktXxAjaUIKmQIDAQABAkAJuV8vxXwkmefdjUx178ga
UlgLaTK147LtJjXbQlZjIlTlqEFSXJbRIqtm8bxIh/iyNCd7twoyE5XRcj0eXNoB
AiEAmDBcv2YRm0D2WRoUcNsjN+q3FeON9NgGwEB/N8PX8zkCIQCKG7c0JQpuuXOf
k0XsP5XDJaRPNCIB5D8ehjDtNZvyYQIgeQLjjLFNSKTz/U92d3JX46t3nykMhGaN
n6rpPV81REkCIB6nxkOh0S4ApiSOmR+2gXSen1khVkcbNdN9r9CHbMUhAiEAjh/D
vGN/biDjhwh6nuVxL2USV842/NElB0SxiCo4uSg=
-----END RSA PRIVATE KEY-----");
// define("PRIVATE_KEY2", env('JWT_SECRET'));

class JWTUtils2
{
     public function generateToken($payload)
     {
          $token = JWT::encode($payload, PRIVATE_KEY2, 'HS256');
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
               $decoded = JWT::decode($token, new Key(PRIVATE_KEY2, 'HS256'));
               return (object)['state' => true, 'msg' => 'OK', 'decoded' => $decoded];
          } catch (\Exception $e) {
               return (object)['state' => false, 'msg' => $e->getMessage(), 'decoded' => []];
          }
     }
}
