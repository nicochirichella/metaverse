import { createFriendshipsRepoMock } from "./mocks";
import { friendshipsLogic } from "../src/logic/friendships";
import { UserState } from "../src/entities/types";

describe("Friendship", () => {
  describe("createFriendship", () => {
    it("should allow to create a friendship when it doesn't exists", async () => {
      const friendships = friendshipsLogic({
        friendshipsRepo: createFriendshipsRepoMock(),
      });
      const friendship = { userAddress1: "foo", userAddress2: "bar" };
  
      await friendships.create(friendship);
  
      const allFriendships = await friendships.getAll();
  
      expect(allFriendships).toHaveLength(1);
      expect(allFriendships[0]).toEqual(friendship);
    });
  
    it("should not allow to create a friendship when it exists, independently of the order", async () => {
      const friendships = friendshipsLogic({
        friendshipsRepo: createFriendshipsRepoMock(),
      });
      const friendship = { userAddress1: "foo", userAddress2: "bar" };
  
      await friendships.create(friendship);
  
      await expect(friendships.create(friendship)).rejects.toThrow(
        "The friendship already exists"
      );
      await expect(
        friendships.create({
          userAddress1: friendship.userAddress2,
          userAddress2: friendship.userAddress1,
        })
      ).rejects.toThrow("The friendship already exists");
    });
  })

  describe('shouldSuggestFriendship', () => {
    it("should not suggest friendship if the users are already friends A->C", async () => {
      const friendships = friendshipsLogic({
        friendshipsRepo: createFriendshipsRepoMock(),
      });
      const friendship = { userAddress1: "A", userAddress2: "C" };
  
      await friendships.create(friendship);
      let date: Date = new Date('2021-12-01');
      let usersInSamePositions: UserState[] = [
            {date, userAddress: 'A' },
            {date, userAddress: 'B' },
            {date, userAddress: 'C' }
      ]
  
      expect(await friendships.suggestFriendship(friendship, usersInSamePositions))
        .toEqual({ shouldSuggest: false })
    })
  
    it("should not suggest friendship if the users are the same A==A", async () => {
      const friendships = friendshipsLogic({
        friendshipsRepo: createFriendshipsRepoMock(),
      });
      const friendship = { userAddress1: "A", userAddress2: "A" };
  
      let date: Date = new Date('2021-12-01');
      let usersInSamePositions: UserState[] = [
            {date, userAddress: 'A' },
            {date, userAddress: 'B' },
            {date, userAddress: 'C' }
      ]
  
      expect(await friendships.suggestFriendship(friendship, usersInSamePositions))
        .toEqual({ shouldSuggest: false })
    })
  
    it("should suggest friendship if there is a friendship connection between A-C " +
        "and are not already friends ", async () => {
      const friendships = friendshipsLogic({
        friendshipsRepo: createFriendshipsRepoMock(),
      });
      await friendships.create({ userAddress1: "A", userAddress2: "B" });
      await friendships.create({ userAddress1: "B", userAddress2: "C" });
  
      let date: Date = new Date('2021-12-01');
      let usersInSamePositions: UserState[] = [
            {date, userAddress: 'A' },
            {date, userAddress: 'B' },
            {date, userAddress: 'C' }
      ]
  
      const friendship = { userAddress1: "A", userAddress2: "C" };
  
      expect(await friendships.suggestFriendship(friendship, usersInSamePositions))
        .toEqual({ shouldSuggest: true })
    })
  });
  
});
