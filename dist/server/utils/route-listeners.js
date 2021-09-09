"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listenForApis = void 0;
const get_answers_api_1 = require("../api/get-answers.api");
const get_question_api_1 = require("../api/get-question.api");
const login_user_api_1 = require("../api/login-user.api");
const register_user_api_1 = require("../api/register-user.api");
const submit_answer_api_1 = require("../api/submit-answer.api");
const middlewares_1 = require("../middlewares");
const apiRoutes = {
    submitAnswerApi: 'api/submit-answer',
    loginApi: 'api/login',
    registerApi: 'api/register',
    getAnswers: 'api/get-answers',
    getQuestion: 'api/get-question'
};
for (const key of Object.keys(apiRoutes)) {
    apiRoutes[key] = '/' + apiRoutes[key];
}
const listenForApis = (server) => {
    server.post(apiRoutes.loginApi, login_user_api_1.loginUserApi);
    server.post(apiRoutes.registerApi, register_user_api_1.registerUserApi);
    server.post(apiRoutes.submitAnswerApi, middlewares_1.accessCheck, submit_answer_api_1.submitAnswerApi);
    server.get(apiRoutes.getQuestion, middlewares_1.accessCheck, get_question_api_1.getQuestionApi);
    server.get(apiRoutes.getAnswers, middlewares_1.accessCheck, get_answers_api_1.getAnswersApi);
};
exports.listenForApis = listenForApis;
//# sourceMappingURL=route-listeners.js.map