import { IApiRequest, IApiResponse } from "../models";
export type TErrorCodes = 'TOKEN_EXPIRED' | 'USER_EXISTS' 
| 'INVALID_CREDENTIALS' | 'INSUFFICIENT_PARAMETERS' | 'FORBIDDEN_VALUE_IN_ANSWER' 
| 'COULD_NOT_POST_ANSWER'
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
  private readonly errorMessages: TErrorMessages = {
    INSUFFICIENT_PARAMETERS: 'Request body lacks required parameters.', 
    INVALID_CREDENTIALS: 'You are not authorized to access this content', 
    USER_EXISTS: 'User already exist', 
    TOKEN_EXPIRED: 'Session is expired', 
    FORBIDDEN_VALUE_IN_ANSWER: 'Answer contains forbidden values', 
    COULD_NOT_POST_ANSWER: 'Your answer could not be posted due to technical problem'
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
    if (result?.error?.code && !result?.error?.message) {
      result.error.message = this.errorMessages[result.error.code]
    }
    this.response.status(200).json(result || null).end();
  };
}