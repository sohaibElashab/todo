import * as jwt from 'jsonwebtoken'

declare module 'jsonwebtoken' {
  export interface VerificatedUser {
    id: string;
    username: string;
    role:string;
    iat: string;
    exp: string;
    aud: string;
    iss: string;
    sub: string;
  }
}