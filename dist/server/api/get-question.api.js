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
exports.getQuestionApi = void 0;
const utils_1 = require("../utils");
const getQuestionApi = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const apiResponder = new utils_1.ApiResponder(request, response);
    const questionId = request.query.questionId;
    if (!!!questionId) {
        apiResponder.sendApiRes({ error: { code: 'INSUFFICIENT_PARAMETERS' } });
        return;
    }
    const sql = `SELECT title FROM questions WHERE id = ${questionId};`;
    const { title } = (yield utils_1.DatabaseService.query(sql))[0];
    apiResponder.sendApiRes({ data: { question: title } });
});
exports.getQuestionApi = getQuestionApi;
//# sourceMappingURL=get-question.api.js.map