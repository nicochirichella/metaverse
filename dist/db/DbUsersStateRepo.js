"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersPositionHistoryRepo = void 0;
function createUsersPositionHistoryRepo(db) {
    return {
        async getAll() {
            return await db.manyOrNone('SELECT * FROM "usersPositionHistory"');
        },
        async create(userState) {
            const date = new Date();
            await db.none('INSERT INTO "usersPositionHistory" ("userAddress", "position", "date") VALUES ($1, $2, $3)', [userState.userAddress, userState.position, date]);
            return userState;
        },
        async createInBulk(usersStates) {
            const date = new Date();
            await db.tx(t => {
                const queries = usersStates.map(userState => {
                    return t.none('INSERT INTO "usersPositionHistory" ("userAddress", "position", "date") VALUES ($1, $2, $3)', [userState.userAddress, userState.position, date]);
                });
                return t.batch(queries);
            });
            return usersStates;
        },
        async getUsersPositionsForFriendshipSuggestion(friendship) {
            return await db.manyOrNone('with t as (select u.date, u.position ' +
                'from "usersPositionHistory" u join "usersPositionHistory" u2 ' +
                'on u.date = u2.date ' +
                'and u."userAddress" != u2."userAddress" ' +
                'and u.position = u2.position ' +
                "where u.\"userAddress\" = '" + friendship.userAddress1 +
                "' and u2.\"userAddress\" = '" + friendship.userAddress2 + "') " +
                'select u."userAddress", u.position, u.date ' +
                'from "usersPositionHistory" u join t ' +
                'on u.position = t.position and u.date = t.date ' +
                'order by u.date, u."userAddress";');
        },
    };
}
exports.createUsersPositionHistoryRepo = createUsersPositionHistoryRepo;
//# sourceMappingURL=DbUsersStateRepo.js.map