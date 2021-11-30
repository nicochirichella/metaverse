"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersPositionHistoryLogic = void 0;
function usersPositionHistoryLogic({ usersPositionHistoryRepo, }) {
    return {
        async getAll() {
            return usersPositionHistoryRepo.getAll();
        },
        async create(userState) {
            return usersPositionHistoryRepo.create(userState);
        },
        async createInBulk(usersStates) {
            return usersPositionHistoryRepo.createInBulk(usersStates);
        },
    };
}
exports.usersPositionHistoryLogic = usersPositionHistoryLogic;
//# sourceMappingURL=usersState.js.map