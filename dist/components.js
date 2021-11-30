"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initComponents = void 0;
const database_1 = require("./db/database");
async function initComponents() {
    const db = database_1.createDatabase();
    return {
        friendshipsRepo: db.users,
        usersPositionHistoryRepo: db.usersState,
        logger: console,
    };
}
exports.initComponents = initComponents;
//# sourceMappingURL=components.js.map