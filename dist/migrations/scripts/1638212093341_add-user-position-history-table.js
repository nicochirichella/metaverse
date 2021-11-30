"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
async function up(pgm) {
    pgm.createTable("usersPositionHistory", {
        userAddress: { type: "text", primaryKey: true },
        date: { type: "timestamp", primaryKey: true },
        position: { type: "jsonb" },
    });
}
exports.up = up;
async function down(pgm) {
    pgm.dropTable("usersPositionHistory");
}
exports.down = down;
//# sourceMappingURL=1638212093341_add-user-position-history-table.js.map