import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, DatabaseService } from "../utils";
export const getQuestionApi = async (request: IApiRequest, response: IApiResponse) => {
    const apiResponder = new ApiResponder(request, response);
    const questionId = request.query.questionId
    if (!!!questionId) {
        apiResponder.sendApiRes({error: {code: 'INSUFFICIENT_PARAMETERS'}})
        return;
    }
    const sql = `SELECT title FROM questions WHERE id = ${questionId};`
    const {title} = (await DatabaseService.query(sql))[0]
    apiResponder.sendApiRes({data: {question: title}})
}