import { Express } from "express";
import { getAnswersApi } from "../api/get-answers.api";
import { getQuestionApi } from "../api/get-question.api";
import { loginUserApi } from "../api/login-user.api";
import { registerUserApi } from "../api/register-user.api";
import { submitAnswerApi } from "../api/submit-answer.api";
import { accessCheck } from "../middlewares";

const apiRoutes = {
    submitAnswerApi: 'api/submit-answer', 
    loginApi: 'api/login', 
    registerApi: 'api/register', 
    getAnswers: 'api/get-answers', 
    getQuestion: 'api/get-question'
}
for (const key of Object.keys(apiRoutes)) {
    apiRoutes[key] = '/' + apiRoutes[key]
}

export const listenForApis = (server: Express) => {
    server.post(apiRoutes.loginApi, loginUserApi as any)
    server.post(apiRoutes.registerApi, registerUserApi as any)
    server.post(apiRoutes.submitAnswerApi, accessCheck as any, submitAnswerApi as any)
    server.get(apiRoutes.getQuestion, accessCheck as any, getQuestionApi as any)
    server.get(apiRoutes.getAnswers, accessCheck as any , getAnswersApi as any)
};