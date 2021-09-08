import { IApiRequest, IApiResponse } from "../models";
import jwtLibrary, { JwtPayload } from "jsonwebtoken";
import { ApiResponder, environments } from "../utils";
import { promisify } from "util";

export const jwtVerifierAsync = promisify(jwtLibrary.verify as (token: string, secretOrPublicKey: string) => JwtPayload | string);
export const jwtSignerAsync = promisify(jwtLibrary.sign);

export const accessCheck = async (
    request: IApiRequest,
    response: IApiResponse,
    next: ({ userId: string }) => void
) => {

    const apiResponder = new ApiResponder(request, response);
    const accessToken = request.headers.ACCESS_TOKEN;
    if (!accessToken) {
        apiResponder.sendApiRes('UNAUTHORIZED');
        return;
    }
    try {
        const { userId } = await jwtVerifierAsync(
            accessToken,
            environments.JWT_SECRET
        ) as JwtPayload;

        next({ userId });

    } catch (error) {
        apiResponder.sendApiRes('UNAUTHORIZED');
    }
};
