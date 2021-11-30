import { AppComponents } from "../app/interfaces";
import { Friendship, UserState } from "../entities/types";

export function usersPositionHistoryLogic({
                                     usersPositionHistoryRepo,
                                 }: Pick<AppComponents, "usersPositionHistoryRepo">) {
    return {
        async getAll() {
            return usersPositionHistoryRepo.getAll();
        },

        async create(userState: UserState) {
            return usersPositionHistoryRepo.create(userState);
        },

        async createInBulk(usersStates: UserState[]){
            return usersPositionHistoryRepo.createInBulk(usersStates);
        },

        async getUsersPositionsForFriendshipSuggestion(friendship: Friendship) {
            return usersPositionHistoryRepo.getUsersPositionsForFriendshipSuggestion(friendship);
        }
    };
}
