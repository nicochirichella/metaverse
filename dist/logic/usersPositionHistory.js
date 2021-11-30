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
        async getUsersPositionsForFriendshipSuggestion(friendship) {
            return usersPositionHistoryRepo.getUsersPositionsForFriendshipSuggestion(friendship);
        }
    };
}
exports.usersPositionHistoryLogic = usersPositionHistoryLogic;
//# sourceMappingURL=usersPositionHistory.js.map