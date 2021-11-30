/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';
import { networkInterfaces } from 'os';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("usersPositionHistory", {
        userAddress: { type: "text", primaryKey: true },
        date: { type: "timestamp", primaryKey: true , default: pgm.func('NOW()') },
        position: { type: "jsonb" },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("usersPositionHistory");
}
