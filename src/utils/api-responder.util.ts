import { IApiRequest, IApiResponse } from "../models";
export type TApiStatus = 'SUCCESS' | 'INTERNAL_SERVER_ERROR' | 'UNAUTHORIZED';
type IStatusCodeMap = {
  [key in TApiStatus]: number
}
export class ApiResponder {
  private _hasError = false;
  private request: IApiRequest;
  private response: IApiResponse;
  readonly statusCodeMap: IStatusCodeMap = {
    INTERNAL_SERVER_ERROR: 500,
    SUCCESS: 200,
    UNAUTHORIZED: 401
  }
  constructor(request: IApiRequest, response: IApiResponse) {
    this.request = request;
    this.response = response;
  }

  public get hasError() {
    return this._hasError;
  }

  public set hasError(hasError: boolean) {
    this._hasError = hasError;
  }

  sendApiRes = (
    status: TApiStatus,
    result?: any
  ) => {
    const statusCode = this.statusCodeMap[status];
    this._hasError = statusCode !== 200;
    this.response.status(statusCode).json(result).end();
  };
}