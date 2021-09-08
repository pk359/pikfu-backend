import { customAlphabet } from "nanoid";

export const getUniqueId = () => {
    const nanoid = customAlphabet("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
    return nanoid();
};
