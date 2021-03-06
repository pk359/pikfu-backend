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
exports.getAnswersFromDb = exports.getAnswersApi = void 0;
const utils_1 = require("../utils");
const getAnswersApi = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const apiResponder = new utils_1.ApiResponder(request, response);
    const questionId = request.query.questionId;
    if (!!!questionId) {
        apiResponder.sendApiRes({ error: { code: 'INSUFFICIENT_PARAMETERS' } });
        return;
    }
    const list = yield (0, exports.getAnswersFromDb)(questionId);
    apiResponder.sendApiRes({ data: { list } });
});
exports.getAnswersApi = getAnswersApi;
const getAnswersFromDb = (questionId) => __awaiter(void 0, void 0, void 0, function* () {
    const sql = `SELECT answer_text as "answerText", u.name as "postedBy", a.posted_at as "postedAt" FROM answers a INNER JOIN users u ON a.posted_by = u.id WHERE question_id = ${questionId} ORDER BY a.posted_at DESC LIMIT 100`;
    return yield utils_1.DatabaseService.query(sql);
});
exports.getAnswersFromDb = getAnswersFromDb;
//# sourceMappingURL=get-answers.api.js.map