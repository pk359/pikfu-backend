import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, DatabaseService } from "../utils";
export const getQuestionApi = async (request: IApiRequest, response: IApiResponse) => {
    const apiResponder = new ApiResponder(request, response);
    const questionId = request.query.questionId
    if (!!questionId) {
        apiResponder.sendApiRes({error: {code: 'INSUFFICIENT_PARAMETERS'}})
        return;
    }
    const sql = `SELECT question_text FROM questions WHERE id = ${questionId};`
    const {question_text} = (await DatabaseService.query(sql))[0]
    apiResponder.sendApiRes({data: {question: question_text}})
}