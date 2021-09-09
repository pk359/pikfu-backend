"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponder = void 0;
class ApiResponder {
    constructor(request, response) {
        this._hasError = false;
        this.errorMessages = {
            INSUFFICIENT_PARAMETERS: 'Request body lacks required parameters.',
            INVALID_CREDENTIALS: 'You are not authorized to access this content',
            USER_EXISTS: 'User already exist',
            TOKEN_EXPIRED: 'Session is expired',
            FORBIDDEN_VALUE_IN_ANSWER: 'Answer contains forbidden values',
            COULD_NOT_POST_ANSWER: 'Your answer could not be posted due to technical problem'
        };
        this.sendApiRes = (result) => {
            var _a, _b;
            this.hasError = !!(result === null || result === void 0 ? void 0 : result.error);
            if (((_a = result === null || result === void 0 ? void 0 : result.error) === null || _a === void 0 ? void 0 : _a.code) && !((_b = result === null || result === void 0 ? void 0 : result.error) === null || _b === void 0 ? void 0 : _b.message)) {
                result.error.message = this.errorMessages[result.error.code];
            }
            this.response.status(200).json(result || null).end();
        };
        this.request = request;
        this.response = response;
    }
    get hasError() {
        return this._hasError;
    }
    set hasError(hasError) {
        this._hasError = hasError;
    }
}
exports.ApiResponder = ApiResponder;
//# sourceMappingURL=api-responder.util.js.map