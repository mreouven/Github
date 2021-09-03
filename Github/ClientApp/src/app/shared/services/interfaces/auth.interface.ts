export interface IToken {
  sub: string;
  auth_time: string;
  jti: string;
  exp: number;
  iss: string;
  aud: string;
}
