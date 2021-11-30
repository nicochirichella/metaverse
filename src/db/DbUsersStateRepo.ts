import { UserState, UsersPositionHistoryRepository, Friendship } from "../entities/types";
import { Database } from "./database";

export function createUsersPositionHistoryRepo(db: Database): UsersPositionHistoryRepository {
  return {
    async getAll() {
      return await db.manyOrNone('SELECT * FROM "usersPositionHistory"');
    },

    async create(userState: UserState) {
        await db.none(
            'INSERT INTO "usersPositionHistory" ("userAddress", "position", "date") VALUES ($1, $2)',
            [userState.userAddress, userState.position]
        );
        return userState;
    },

    async createInBulk(usersStates: UserState[]) {
        await db.tx(t => {
            const queries = usersStates.map(userState => {
                return t.none('INSERT INTO "usersPositionHistory" ("userAddress", "position") VALUES ($1, $2)',
                    [userState.userAddress, userState.position]);
            });
            return t.batch(queries);
        });
        return usersStates;
    },

    async getUsersPositionsForFriendshipSuggestion(friendship: Friendship) {
        return await db.manyOrNone('with t as (select u.date, u.position ' +
            'from "usersPositionHistory" u join "usersPositionHistory" u2 ' +
             'on u.date = u2.date ' +
                'and u."userAddress" != u2."userAddress" ' +
                'and u.position = u2.position ' +
            "where u.\"userAddress\" = '"+ friendship.userAddress1 +
            "' and u2.\"userAddress\" = '" +friendship.userAddress2 +"' "+
            "and u.date > now() - interval '2 hours') " +
        'select u."userAddress", u.position, u.date ' +
        'from "usersPositionHistory" u join t ' +
        'on u.position = t.position and u.date = t.date '+
        'order by u.date, u."userAddress";');
    },
  };
}
