import { AppComponents } from "./app/interfaces";
import { createDatabase } from "./db/database";

export async function initComponents(): Promise<AppComponents> {
  const db = createDatabase();
  return {
    friendshipsRepo: db.users,
    usersPositionHistoryRepo: db.usersState,
    logger: console,
  };
}
