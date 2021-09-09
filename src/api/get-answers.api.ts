import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, DatabaseService } from "../utils";
export const getAnswersApi = async (request: IApiRequest, response: IApiResponse) => {
    const apiResponder = new ApiResponder(request, response);

    const questionId = request.query.questionId as unknown as number;
    if (!!!questionId) {
        apiResponder.sendApiRes({ error: { code: 'INSUFFICIENT_PARAMETERS' } })
        return;
    }
    
    const list = await getAnswersFromDb(questionId);
    apiResponder.sendApiRes({ data: { list } })
}

export const getAnswersFromDb = async (questionId: number) => {
    const sql = `SELECT answer_text as "answerText", u.name as "postedBy", a.posted_at as "postedAt" FROM answers a INNER JOIN users u ON a.posted_by = u.id WHERE question_id = ${questionId} ORDER BY a.posted_at DESC LIMIT 100`
    return await DatabaseService.query(sql);
}