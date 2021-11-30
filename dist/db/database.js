"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDatabase = void 0;
const pg_promise_1 = __importDefault(require("pg-promise"));
const db_1 = require("../config/db");
const DbFriendshipsRepo_1 = require("./DbFriendshipsRepo");
const DbUsersStateRepo_1 = require("./DbUsersStateRepo");
function createDatabase() {
    const pgp = pg_promise_1.default({
        extend: (db) => {
            db.users = DbFriendshipsRepo_1.createFriendshipsRepo(db);
            db.usersState = DbUsersStateRepo_1.createUsersPositionHistoryRepo(db);
        },
    });
    return pgp(db_1.DEFAULT_DATABASE_CONFIG);
}
exports.createDatabase = createDatabase;
//# sourceMappingURL=database.js.map