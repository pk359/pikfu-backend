import { JwtPayload } from "jsonwebtoken";
import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, environments, jwtVerifierAsync } from "../utils";
export const accessCheck = async (
    request: IApiRequest,
    response: IApiResponse,
    next: () => void
) => {

    const apiResponder = new ApiResponder(request, response);
    const accessToken = request.headers.jwt_token;
    if (!accessToken) {
        apiResponder.sendApiRes({ error: { code: 'TOKEN_EXPIRED' } });
        return;
    }
    try {
        const { userId } = await jwtVerifierAsync(
            accessToken,
            environments.JWT_SECRET
        ) as JwtPayload;

        request['userId'] = userId;
        next();

    } catch (error) {
        apiResponder.sendApiRes({ error: { code: 'TOKEN_EXPIRED' } });
    }
};
