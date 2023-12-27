import { jwtDecode } from "jwt-decode";

export interface IDecodedToken {
  regis_id: string;
  creator_id: string;
  email: string;
  iat: number;
  exp: number;
}

export const getParsedToken = (token: string): IDecodedToken => {
  const decodedToken = jwtDecode<IDecodedToken>(token);
  return decodedToken;
};
