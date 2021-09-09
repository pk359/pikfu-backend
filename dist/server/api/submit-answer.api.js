"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswerApi = void 0;
const utils_1 = require("../utils");
const web_sockets_util_1 = require("../utils/web-sockets.util");
const get_answers_api_1 = require("./get-answers.api");
const submitAnswerApi = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const apiResponder = new utils_1.ApiResponder(request, response);
    const forbiddenValues = ['yes', 'no', `that's fine`, `I don't know`];
    const { answer, questionId } = request.body;
    const userId = request.userId;
    if (!answer) {
        apiResponder.sendApiRes({ error: { code: 'INSUFFICIENT_PARAMETERS' } });
        return;
    }
    const forbidden = forbiddenValues.indexOf(answer) !== -1;
    if (forbidden) {
        apiResponder.sendApiRes({
            error: { code: 'FORBIDDEN_VALUE_IN_ANSWER' }
        });
        return;
    }
    const postAnswerSql = `
    INSERT INTO answers (question_id, answer_text, posted_at, posted_by) 
    VALUES ('${questionId}', '${answer}', now(), '${userId}') RETURNING id`;
    const answerId = (_a = (yield utils_1.DatabaseService.query(postAnswerSql))[0]) === null || _a === void 0 ? void 0 : _a.id;
    if (!answerId) {
        apiResponder.sendApiRes({ error: { code: 'COULD_NOT_POST_ANSWER' } });
        return;
    }
    (() => __awaiter(void 0, void 0, void 0, function* () {
        const list = yield (0, get_answers_api_1.getAnswersFromDb)(questionId);
        web_sockets_util_1.WebSocketManager.sendMessage({
            action: 'gotAnswers', payload: {
                list
            }
        });
    }))();
    apiResponder.sendApiRes({
        data: {
            successful: true
        }
    });
});
exports.submitAnswerApi = submitAnswerApi;
//# sourceMappingURL=submit-answer.api.js.map