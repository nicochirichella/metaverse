"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendshipsLogic = void 0;
const express_utils_1 = require("../utils/express-utils");
const usersFunctions_1 = require("../helpers/usersFunctions");
function friendshipsLogic({ friendshipsRepo, }) {
    return {
        async getAll() {
            return friendshipsRepo.getAll();
        },
        async create(friendship) {
            if (await friendshipsRepo.exists(friendship))
                throw new express_utils_1.ServiceError("The friendship already exists");
            return friendshipsRepo.create(friendship);
        },
        async suggestFriendship(friendship, usersInSamePositions) {
            let suggestionResult = false;
            let usersGroupedByDateInSameLand = usersFunctions_1.groupUsersByDate(usersInSamePositions);
            console.log(usersGroupedByDateInSameLand);
            if (await friendshipsRepo.exists(friendship) || friendship.userAddress1 == friendship.userAddress2)
                return { shouldSuggest: false };
            let unrepeatedBuckets = usersFunctions_1.getUnrepeatedUsersBuckets(usersGroupedByDateInSameLand);
            console.log(unrepeatedBuckets);
            let allFriendships = await friendshipsRepo.getAll();
            let friendshipsMap = usersFunctions_1.generateFriendshipsMap(allFriendships);
            let i = 0;
            while (!suggestionResult && i < unrepeatedBuckets.length) {
                suggestionResult = usersFunctions_1.existPathInBucket(friendship, friendshipsMap, unrepeatedBuckets[i]);
                i++;
            }
            return { shouldSuggest: suggestionResult };
        },
    };
}
exports.friendshipsLogic = friendshipsLogic;
//# sourceMappingURL=friendships.js.map