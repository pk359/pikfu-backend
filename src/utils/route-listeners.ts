import { Express } from "express";
import { submitQuestionApi } from "../api/submit-question.api";
import { accessCheck } from "../middlewares";
export const listenForApis = (server: Express) => {
    server.post('/api/submit-question', accessCheck as any,  submitQuestionApi as any)
};