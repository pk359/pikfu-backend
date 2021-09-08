import { Request, Response } from "express";
export type IRequestHeaders = {
    'ACCESS_TOKEN': string;
}
export interface IApiRequest extends Request {
    headers: IRequestHeaders
}
export interface IApiResponse extends Response {

}