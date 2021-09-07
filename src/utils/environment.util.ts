import dotenv from 'dotenv';
import { IServerEnvironment } from "../models";
dotenv.config({ path: './env/.env' });
export const environments = process.env as unknown as IServerEnvironment;
