"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericExceptionHandler = void 0;
const genericExceptionHandler = (err, req, res, next) => {
    if ((err === null || err === void 0 ? void 0 : err.message) && (err === null || err === void 0 ? void 0 : err.status)) {
        const { status, message } = err;
        res.status(status);
        res.json({ status, message });
    }
    next(err);
};
exports.genericExceptionHandler = genericExceptionHandler;
//# sourceMappingURL=exceptionsHandler.js.map