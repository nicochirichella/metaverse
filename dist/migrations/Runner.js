"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationsRunner = void 0;
const node_pg_migrate_1 = __importDefault(require("node-pg-migrate"));
const path_1 = require("path");
const db_1 = require("../config/db");
exports.MigrationsRunner = {
    async run() {
        const migrationsFolder = path_1.join(__dirname, "scripts");
        const options = {
            migrationsTable: "migrations",
            dir: migrationsFolder,
            direction: "up",
            createSchema: true,
            createMigrationsSchema: true,
            ignorePattern: ".*.ts|.*.map",
            count: Infinity,
            databaseUrl: db_1.DEFAULT_DATABASE_CONFIG,
            verbose: true,
        };
        await node_pg_migrate_1.default(options);
    },
};
//# sourceMappingURL=Runner.js.map