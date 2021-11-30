"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = exports.ServiceError = void 0;
const statusTexts = {
    400: "bad-request",
    401: "unauthorized",
    402: "method-not-allowed",
    403: "forbidden",
    404: "not-found",
    500: "internal-server-error",
    501: "not-implemented",
    503: "service-unavailable",
};
class ServiceError extends Error {
    constructor(message, statusCode = 400, statusMessage) {
        super(message);
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
    }
}
exports.ServiceError = ServiceError;
function asyncHandler(handler, { logger }) {
    return async (req, res) => {
        var _a, _b;
        try {
            await handler(req, res);
        }
        catch (e) {
            if (e instanceof ServiceError) {
                logger.error("info", `Error while performing request ${req.method} ${req.originalUrl}`, e);
                res
                    .status(e.statusCode)
                    .send({
                    status: (_b = (_a = e.statusMessage) !== null && _a !== void 0 ? _a : statusTexts[e.statusCode]) !== null && _b !== void 0 ? _b : "error",
                    message: e.message,
                });
            }
            else {
                // Unexpected errors should terminate the application
                logger.error("Unexpected error in server. Application will terminate", e);
                process.exit(1);
            }
        }
    };
}
exports.asyncHandler = asyncHandler;
//# sourceMappingURL=express-utils.js.map