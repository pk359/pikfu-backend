import { IApiRequest, IApiResponse } from "../models";
export type TErrorCodes = 'USER_EXISTS' | 'INVALID_CREDENTIALS' | 'INSUFFICIENT_PARAMETERS'
export type TErrorMessages = {
  [key in TErrorCodes]: string;
}
interface IApiResult {
  error?: {code: TErrorCodes, message?: string} | null;
  data?: any;
}
export class ApiResponder {
  private _hasError = false;
  private request: IApiRequest;
  private response: IApiResponse;
  readonly errorMessages: TErrorMessages = {
    INSUFFICIENT_PARAMETERS: 'Request body lacks required parameters.', 
    INVALID_CREDENTIALS: 'You are not authorized to access this content', 
    USER_EXISTS: 'User already exist'
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
    result?: IApiResult
  ) => {
    this.hasError = !!result?.error;
    if (result?.error?.code) {
      result.error.message = this.errorMessages[result.error.code]
    }
    this.response.status(200).json(result || null).end();
  };
}