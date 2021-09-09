import { JwtPayload } from "jsonwebtoken";
import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, environments, jwtVerifierAsync } from "../utils";
export const accessCheck = async (
    request: IApiRequest,
    response: IApiResponse,
    next: ({ userId: string }) => void
) => {

    const apiResponder = new ApiResponder(request, response);
    const accessToken = request.headers.JWT_TOKEN;
    if (!accessToken) {
        apiResponder.sendApiRes({ error: { code: 'TOKEN_EXPIRED' } });
        return;
    }
    try {
        const { userId } = await jwtVerifierAsync(
            accessToken,
            environments.JWT_SECRET
        ) as JwtPayload;

        next({ userId });

    } catch (error) {
        apiResponder.sendApiRes({ error: { code: 'TOKEN_EXPIRED' } });
    }
};
