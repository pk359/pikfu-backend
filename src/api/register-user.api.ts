import { IApiRequest, IApiResponse } from "../models";
import { ApiResponder, DatabaseService, environments, generateHashedPassword, getUniqueId, jwtSignerAsync } from "../utils";
export const registerUserApi = async (request: IApiRequest, response: IApiResponse) => {
    const apiResponder = new ApiResponder(request, response);
    const { name, email, password } = request.body;
    const hashedPassword = await generateHashedPassword(password);

    const sql = `INSERT INTO users (name, email, encrypted_password) VALUES ('${name?.trim()}', '${email?.trim()}', '${hashedPassword}') RETURNING id`;
    const dbRes = await DatabaseService.query(sql).catch(error => {
        console.error(error)
        apiResponder.sendApiRes({ error: { code: 'USER_EXISTS' } });
    })
    if (apiResponder.hasError) {
        return;
    }
    const id = dbRes[0].id;
    const payload = { userId: id };
    const jwtToken = await jwtSignerAsync(payload, environments.JWT_SECRET);
    apiResponder.sendApiRes({data: {jwtToken}});
}