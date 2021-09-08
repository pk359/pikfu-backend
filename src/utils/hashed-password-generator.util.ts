import * as bcrypt from "bcryptjs";
import { promisify } from "util";
const bcryptGenSalt = promisify(bcrypt.genSalt as (rounds?: number) => Promise<string>);
const bcryptHash = promisify(bcrypt.hash as (s: string, salt: string) => Promise<string>);
const bcryptCompare = promisify(bcrypt.compare);
export const generateHashedPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcryptGenSalt(saltRounds) as string;
    const hash = await bcryptHash(password, salt);
    return hash;
}

export const comparePassword = async ({ password, hash }: { password: string; hash: string }) => {
    try {
        await bcryptCompare(password, hash);
        return true;
    } catch (error) {
        return false;
    }
}