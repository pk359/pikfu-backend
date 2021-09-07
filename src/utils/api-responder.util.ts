import { Response, Request } from "express";
export class ApiResponder {
    private _hasError = false;
    private request: Request;
    private response: Response;
    constructor(request: Request, response: Response) {
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
      callStatus: boolean,
      statusCode: number,
      message?: string,
      result?: any
    ) => {
      this._hasError = !!callStatus;
      const res = {
        status: callStatus,
        result_code: statusCode,
        message,
        data: result,
      };
      this.response.status(200).json(res).end();
    };
  }