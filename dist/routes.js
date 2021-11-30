"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureRoutes = void 0;
const status_1 = require("./logic/status");
const friendships_1 = require("./logic/friendships");
const usersPositionHistory_1 = require("./logic/usersPositionHistory");
const express_utils_1 = require("./utils/express-utils");
async function configureRoutes(expressApp, components) {
    const friendships = friendships_1.friendshipsLogic(components);
    const usersPositionHistory = usersPositionHistory_1.usersPositionHistoryLogic(components);
    const status = status_1.statusLogic();
    expressApp.get("/status", (_req, res) => res.send(status.getStatus()));
    expressApp.get("/friendships", express_utils_1.asyncHandler(async (_req, res) => {
        res.send(await friendships.getAll());
    }, components));
    expressApp.post("/friendships/:address1/:address2", express_utils_1.asyncHandler(async (req, res) => {
        res.send(await friendships.create({
            userAddress1: req.params.address1,
            userAddress2: req.params.address2,
        }));
    }, components));
    expressApp.post("/users-update", express_utils_1.asyncHandler(async (req, res) => {
        let usersUpdates = req.body;
        let usersPositions = usersUpdates.moved.map(au => {
            return { "userAddress": au.id, "position": au.position };
        });
        res.send(await usersPositionHistory.createInBulk(usersPositions));
    }, components));
    expressApp.get("/suggest-friendship/:address1/:address2", express_utils_1.asyncHandler(async (req, res) => {
        let possibleFriendship = { userAddress1: req.params.address1, userAddress2: req.params.address2 };
        let allUsersInSamePosition = await usersPositionHistory.getUsersPositionsForFriendshipSuggestion(possibleFriendship);
        res.send(await friendships.suggestFriendship(possibleFriendship, allUsersInSamePosition));
    }, components));
}
exports.configureRoutes = configureRoutes;
//# sourceMappingURL=routes.js.map