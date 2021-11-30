import pgPromise, { IDatabase } from "pg-promise";
import { DEFAULT_DATABASE_CONFIG } from "../config/db";
import { FriendshipsRepository, UsersPositionHistoryRepository } from "../entities/types";
import { createFriendshipsRepo as createFriendshipsRepo } from "./DbFriendshipsRepo";
import { createUsersPositionHistoryRepo as createUsersStateRepo } from "./DbUsersStateRepo";

interface DbExtensions {
  users: FriendshipsRepository;
  usersState: UsersPositionHistoryRepository;
}

export type Database = IDatabase<DbExtensions> & DbExtensions;

export function createDatabase(): Database {
  const pgp = pgPromise({
    extend: (db: Database) => {
      db.users = createFriendshipsRepo(db);
      db.usersState = createUsersStateRepo(db);
    },
  });

  return pgp(DEFAULT_DATABASE_CONFIG);
}
