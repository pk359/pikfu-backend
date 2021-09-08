
import jwtLibrary, { JwtPayload } from "jsonwebtoken";
import { promisify } from "util";
export const jwtVerifierAsync = promisify(jwtLibrary.verify as (token: string, secretOrPublicKey: string) => JwtPayload | string);
export const jwtSignerAsync = promisify(jwtLibrary.sign);
