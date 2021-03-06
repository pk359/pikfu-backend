import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, comparePassword, DatabaseService, environments, generateHashedPassword, jwtSignerAsync, jwtVerifierAsync } from "../utils";
export const loginUserApi = async (request: IApiRequest, response: IApiResponse) => {
    const apiResponder = new ApiResponder(request, response);
    const { email, password } = request.body;
    if (!(email && password)) {
        apiResponder.sendApiRes({error: {code: 'INVALID_CREDENTIALS'}})
        return;
    }
    
    const fetchUserSQL = `SELECT * FROM users WHERE email = '${email}'`;
    const user = await DatabaseService.query(fetchUserSQL).catch(error => {
        console.error(error);
        apiResponder.sendApiRes({error: {code: 'INVALID_CREDENTIALS'}})
    })
    if (apiResponder.hasError) {
        return;
    }

    if (!user[0]) {
        apiResponder.sendApiRes({error: {code: 'INVALID_CREDENTIALS'}})
        return;
    }
    const isMatch = await comparePassword({ hash: user[0].encrypted_password, password })
    if (!isMatch) {
        apiResponder.sendApiRes({error: {code: 'INVALID_CREDENTIALS'}})
        return;
    }
    // 1 year of expiry
    const payload = { userId: user[0].id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365)};
    const jwtToken = await jwtSignerAsync(payload, environments.JWT_SECRET)
    apiResponder.sendApiRes({data: {jwtToken}});
}