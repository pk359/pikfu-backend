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
exports.accessCheck = void 0;
const utils_1 = require("../utils");
const accessCheck = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const apiResponder = new utils_1.ApiResponder(request, response);
    const accessToken = request.headers.jwt_token;
    if (!accessToken) {
        apiResponder.sendApiRes({ error: { code: 'TOKEN_EXPIRED' } });
        return;
    }
    try {
        const { userId } = yield (0, utils_1.jwtVerifierAsync)(accessToken, utils_1.environments.JWT_SECRET);
        request['userId'] = userId;
        next();
    }
    catch (error) {
        apiResponder.sendApiRes({ error: { code: 'TOKEN_EXPIRED' } });
    }
});
exports.accessCheck = accessCheck;
//# sourceMappingURL=access-check.middleware.js.map