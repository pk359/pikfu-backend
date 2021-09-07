import { IServerEnvironment } from "../models";
import dotenv from 'dotenv';
import { resolve } from "path";
dotenv.config({ path: resolve(__dirname, './../env/.env') });
export const environments = process.env as unknown as IServerEnvironment;
