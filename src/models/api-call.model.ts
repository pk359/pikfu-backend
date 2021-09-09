import { Request, Response } from "express";
export type IRequestHeaders = {
    'jwt_token': string;
}
export interface IApiRequest extends Request {
    headers: IRequestHeaders
}
export interface IApiResponse extends Response {

}