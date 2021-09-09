"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: (_origin, callback) => {
        callback(null, true);
    },
};
//# sourceMappingURL=set-cors-option.util.js.map