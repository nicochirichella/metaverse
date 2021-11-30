import { AppComponents } from "../app/interfaces";
import { Friendship, UserState } from "../entities/types";
import { ServiceError } from "../utils/express-utils";
import { groupUsersByDate, getUnrepeatedUsersBuckets, existPathInBucket, generateFriendshipsMap } from "../helpers/usersFunctions";

export function friendshipsLogic({
  friendshipsRepo,
}: Pick<AppComponents, "friendshipsRepo">) {
  return {
    async getAll() {
      return friendshipsRepo.getAll();
    },

    async create(friendship: Friendship) {
      if (await friendshipsRepo.exists(friendship))
        throw new ServiceError("The friendship already exists");
      return friendshipsRepo.create(friendship);
    },

    async suggestFriendship(friendship: Friendship, usersInSamePositions: UserState[]) {
      let suggestionResult: boolean = false;
      let usersGroupedByDateInSameLand : Map<string, string[]> = groupUsersByDate(usersInSamePositions);
      
      if (await friendshipsRepo.exists(friendship) || friendship.userAddress1 == friendship.userAddress2)
        return { shouldSuggest: false };
      
      let unrepeatedBuckets = getUnrepeatedUsersBuckets(usersGroupedByDateInSameLand);

      let allFriendships = await friendshipsRepo.getAll();
      let friendshipsMap: Map<string, boolean> = generateFriendshipsMap(allFriendships);

      let i = 0;
      while (!suggestionResult && i<unrepeatedBuckets.length ) {
        suggestionResult = existPathInBucket(friendship, friendshipsMap, unrepeatedBuckets[i]);
        i++;
      } 
      return { shouldSuggest: suggestionResult }
    },
  };
}
