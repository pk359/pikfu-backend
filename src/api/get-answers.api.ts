import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, DatabaseService } from "../utils";
export const getAnswersApi = async (request: IApiRequest, response: IApiResponse) => {
    const apiResponder = new ApiResponder(request, response);
    
    const questionId = request.query.questionId
    if (!!questionId) {
        apiResponder.sendApiRes({error: {code: 'INSUFFICIENT_PARAMETERS'}})
        return;
    }
    const sql = `SELECT answer_text as answerText, a.posted_by as postedBy, a.posted_at as postedAt FROM answers a INNER JOIN users u ON a.posted_by = u.id WHERE question_id = ${questionId} `
    const list = (await DatabaseService.query(sql))
    apiResponder.sendApiRes({data: {list }})
}