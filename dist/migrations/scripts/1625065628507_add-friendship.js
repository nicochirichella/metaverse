"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = exports.shorthands = void 0;
exports.shorthands = undefined;
async function up(pgm) {
    pgm.createTable("friendships", {
        userAddress1: { type: "text", primaryKey: true },
        userAddress2: { type: "text", primaryKey: true },
    });
}
exports.up = up;
async function down(pgm) {
    pgm.dropTable("friendships");
}
exports.down = down;
//# sourceMappingURL=1625065628507_add-friendship.js.map