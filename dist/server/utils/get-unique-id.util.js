"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueId = void 0;
const nanoid_1 = require("nanoid");
const getUniqueId = () => {
    const nanoid = (0, nanoid_1.customAlphabet)("1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
    return nanoid();
};
exports.getUniqueId = getUniqueId;
//# sourceMappingURL=get-unique-id.util.js.map