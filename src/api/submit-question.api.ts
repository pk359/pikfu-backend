import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder } from "../utils";
export const submitQuestionApi = async (request: IApiRequest, response: IApiResponse) => {
    const apiResponder = new ApiResponder(request, response);
    const userToken = request.headers.ACCESS_TOKEN;
}