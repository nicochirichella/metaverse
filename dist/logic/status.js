"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusLogic = void 0;
function statusLogic() {
    return {
        getStatus() {
            return { status: "ok", time: Date.now() };
        },
    };
}
exports.statusLogic = statusLogic;
//# sourceMappingURL=status.js.map