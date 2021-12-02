import { Express } from "express";
import { AppComponents } from "./app/interfaces";
import { statusLogic } from "./logic/status";
import { friendshipsLogic } from "./logic/friendships";
import { usersPositionHistoryLogic } from "./logic/usersPositionHistory";
import { asyncHandler } from "./utils/express-utils";
import {Friendship, UserState, usersUpdateRequest} from "./entities/types";

export async function configureRoutes(
  expressApp: Express,
  components: AppComponents
) {
  const friendships = friendshipsLogic(components);
  const usersPositionHistory = usersPositionHistoryLogic(components);
  const status = statusLogic();

  expressApp.get("/status", (_req, res) => res.send(status.getStatus()));

  expressApp.get(
    "/friendships",
    asyncHandler(async (_req, res) => {
      res.send(await friendships.getAll());
    }, components)
  );

  expressApp.post(
    "/friendships/:address1/:address2",
    asyncHandler(async (req, res) => {
      res.send(
        await friendships.create({
          userAddress1: req.params.address1,
          userAddress2: req.params.address2,
        })
      );
    }, components)
  );

    expressApp.post(
        "/users-update",
        asyncHandler(async (req, res) => {
            let usersUpdates: usersUpdateRequest = req.body;
            let usersPositions: UserState[] = usersUpdates.moved.map(au => {
                return {"userAddress" : au.id, "position": au.position}
            });
            
            res.send(
                await usersPositionHistory.createInBulk(usersPositions)
            );
        }, components)
    );

    expressApp.get(
      "/suggest-friendship/:address1/:address2",
      asyncHandler(async (req, res) => {
        let possibleFriendship: Friendship = { userAddress1: req.params.address1, userAddress2: req.params.address2 }
        let allUsersInSameParcels: UserState[] = await usersPositionHistory.getUsersPositionsForFriendshipSuggestion(possibleFriendship);
        
        res.send(
          await friendships.suggestFriendship(possibleFriendship, allUsersInSameParcels)
        );
      }, components)
    );

}
