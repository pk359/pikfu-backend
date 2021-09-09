import { Request, Response } from "express";
export type IRequestHeaders = {
    'jwt_token': string;
}
export interface IApiRequest extends Request {
    userId?: number;
    headers: IRequestHeaders
}
export interface IApiResponse extends Response {

}