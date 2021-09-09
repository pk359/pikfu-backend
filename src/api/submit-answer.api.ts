import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, DatabaseService } from "../utils";
import { WebSocketManager } from "../utils/web-sockets.util";
import { getAnswersFromDb } from "./get-answers.api";
export const submitAnswerApi = async (request: IApiRequest, response: IApiResponse) => {
    const apiResponder = new ApiResponder(request, response);
    const forbiddenValues = ['yes', 'no', `that's fine`, `I don't know`];
    const { answer, questionId } = request.body;
    const userId = request.userId;
    if (!answer) {
        apiResponder.sendApiRes({ error: { code: 'INSUFFICIENT_PARAMETERS' } });
        return;
    }

    const forbidden = forbiddenValues.indexOf(answer) !== -1
    if (forbidden) {
        apiResponder.sendApiRes({
            error: { code: 'FORBIDDEN_VALUE_IN_ANSWER' }
        })
        return;

    }

    const postAnswerSql = `
    INSERT INTO answers (question_id, answer_text, posted_at, posted_by) 
    VALUES ('${questionId}', '${answer}', now(), '${userId}') RETURNING id`;

    const answerId = (await DatabaseService.query(postAnswerSql))[0]?.id;
    if (!answerId) {
        apiResponder.sendApiRes({ error: { code: 'COULD_NOT_POST_ANSWER' } })
        return;
    }


    (async () => {
        const list = await getAnswersFromDb(questionId)
        WebSocketManager.sendMessage({
            action: 'gotAnswers', payload: {
                list
            }
        })
    })()

    apiResponder.sendApiRes({
        data: {
            successful: true
        }
    })
}