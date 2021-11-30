"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFriendshipsRepo = void 0;
function createFriendshipsRepo(db) {
    return {
        async getAll() {
            return await db.manyOrNone("SELECT * FROM FRIENDSHIPS");
        },
        async create(friendship) {
            await db.none('INSERT INTO FRIENDSHIPS ("userAddress1", "userAddress2") VALUES ($1, $2)', [friendship.userAddress1, friendship.userAddress2]);
            return friendship;
        },
        async exists(friendship) {
            return (await db.one('SELECT EXISTS (SELECT 1 FROM FRIENDSHIPS WHERE ("userAddress1" = $1 AND "userAddress2" = $2) OR ("userAddress2" = $1 AND "userAddress1" = $2))', [friendship.userAddress1, friendship.userAddress2])).exists;
        },
    };
}
exports.createFriendshipsRepo = createFriendshipsRepo;
//# sourceMappingURL=DbFriendshipsRepo.js.map