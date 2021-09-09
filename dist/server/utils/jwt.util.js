"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSignerAsync = exports.jwtVerifierAsync = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
exports.jwtVerifierAsync = (0, util_1.promisify)(jsonwebtoken_1.default.verify);
exports.jwtSignerAsync = (0, util_1.promisify)(jsonwebtoken_1.default.sign);
//# sourceMappingURL=jwt.util.js.map