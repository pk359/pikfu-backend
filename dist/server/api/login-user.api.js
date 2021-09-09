"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserApi = void 0;
const utils_1 = require("../utils");
const loginUserApi = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const apiResponder = new utils_1.ApiResponder(request, response);
    const { email, password } = request.body;
    if (!(email && password)) {
        apiResponder.sendApiRes({ error: { code: 'INVALID_CREDENTIALS' } });
        return;
    }
    const fetchUserSQL = `SELECT * FROM users WHERE email = '${email}'`;
    const user = yield utils_1.DatabaseService.query(fetchUserSQL).catch(error => {
        console.error(error);
        apiResponder.sendApiRes({ error: { code: 'INVALID_CREDENTIALS' } });
    });
    if (apiResponder.hasError) {
        return;
    }
    if (!user[0]) {
        apiResponder.sendApiRes({ error: { code: 'INVALID_CREDENTIALS' } });
        return;
    }
    const isMatch = yield (0, utils_1.comparePassword)({ hash: user[0].encrypted_password, password });
    if (!isMatch) {
        apiResponder.sendApiRes({ error: { code: 'INVALID_CREDENTIALS' } });
        return;
    }
    // 1 year of expiry
    const payload = { userId: user[0].id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) };
    const jwtToken = yield (0, utils_1.jwtSignerAsync)(payload, utils_1.environments.JWT_SECRET);
    apiResponder.sendApiRes({ data: { jwtToken } });
});
exports.loginUserApi = loginUserApi;
//# sourceMappingURL=login-user.api.js.map