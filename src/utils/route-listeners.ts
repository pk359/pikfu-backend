import { Express } from "express";
import { loginUserApi } from "../api/login-user.api";
import { registerUserApi } from "../api/register-user.api";
import { submitAnswerApi } from "../api/submit-answer.api";
import { accessCheck } from "../middlewares";

const apiRoutes = {
    submitAnswerApi: 'api/submit-question',
    loginApi: 'api/login',
    registerApi: 'api/register'
}
for (const key of Object.keys(apiRoutes)) {
    apiRoutes[key] = '/' + apiRoutes[key]
}

export const listenForApis = (server: Express) => {
    server.post(apiRoutes.loginApi, loginUserApi as any)
    server.post(apiRoutes.registerApi, registerUserApi as any)
    server.post(apiRoutes.submitAnswerApi, accessCheck as any, submitAnswerApi as any)
};