import type { ITokenResponse } from "./ITokenResponse";

export interface IAuth extends ITokenResponse {
  username: string;
  password: string;
}