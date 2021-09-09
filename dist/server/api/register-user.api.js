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
exports.registerUserApi = void 0;
const utils_1 = require("../utils");
const registerUserApi = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const apiResponder = new utils_1.ApiResponder(request, response);
    const { name, email, password } = request.body;
    const hashedPassword = yield (0, utils_1.generateHashedPassword)(password);
    const sql = `INSERT INTO users (name, email, encrypted_password) VALUES ('${name === null || name === void 0 ? void 0 : name.trim()}', '${email === null || email === void 0 ? void 0 : email.trim()}', '${hashedPassword}') RETURNING id`;
    const dbRes = yield utils_1.DatabaseService.query(sql).catch(error => {
        console.error(error);
        apiResponder.sendApiRes({ error: { code: 'USER_EXISTS' } });
    });
    if (apiResponder.hasError) {
        return;
    }
    const id = dbRes[0].id;
    // expire token in 1 year
    const payload = { userId: id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 365) };
    const jwtToken = yield (0, utils_1.jwtSignerAsync)(payload, utils_1.environments.JWT_SECRET);
    apiResponder.sendApiRes({ data: { jwtToken } });
});
exports.registerUserApi = registerUserApi;
//# sourceMappingURL=register-user.api.js.map