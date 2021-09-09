"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.environments = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './env/.env' });
exports.environments = process.env;
//# sourceMappingURL=environment.util.js.map