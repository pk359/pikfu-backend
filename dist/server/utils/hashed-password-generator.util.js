"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.comparePassword = exports.generateHashedPassword = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const util_1 = require("util");
const bcryptGenSalt = (0, util_1.promisify)(bcrypt.genSalt);
const bcryptHash = (0, util_1.promisify)(bcrypt.hash);
const bcryptCompare = (0, util_1.promisify)(bcrypt.compare);
const generateHashedPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = 10;
    const salt = yield bcryptGenSalt(saltRounds);
    const hash = yield bcryptHash(password, salt);
    return hash;
});
exports.generateHashedPassword = generateHashedPassword;
const comparePassword = ({ password, hash }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield bcryptCompare(password, hash);
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.comparePassword = comparePassword;
//# sourceMappingURL=hashed-password-generator.util.js.map