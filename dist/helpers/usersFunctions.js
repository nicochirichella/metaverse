"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.existPathInBucket = exports.generateFriendshipsMap = exports.generateFriendshipKey = exports.getUnrepeatedUsersBuckets = exports.groupUsersByDate = void 0;
function groupUsersByDate(usersInSamePositions) {
    let groupByDate = new Map();
    usersInSamePositions.forEach((userState) => {
        var _a;
        let key = userState.date ? userState.date.toLocaleString() : new Date().toDateString();
        if (groupByDate.has(key)) {
            (_a = groupByDate.get(key)) === null || _a === void 0 ? void 0 : _a.push(userState.userAddress);
        }
        else {
            groupByDate.set(key, [userState.userAddress]);
        }
    });
    return groupByDate;
}
exports.groupUsersByDate = groupUsersByDate;
function getUnrepeatedUsersBuckets(usersBuckets) {
    let visitedBuckets = new Map();
    let bucketsWithoutRepetitions = [...usersBuckets.values()]
        .filter(bucket => {
        let key = bucket.join('-');
        if (visitedBuckets.has(key))
            return false;
        visitedBuckets.set(key, true);
        return true;
    });
    return bucketsWithoutRepetitions;
}
exports.getUnrepeatedUsersBuckets = getUnrepeatedUsersBuckets;
function generateFriendshipKey(friendship) {
    return [friendship.userAddress1, friendship.userAddress2].sort().join('-');
}
exports.generateFriendshipKey = generateFriendshipKey;
function generateFriendshipsMap(frienshipList) {
    let friendshipsMap = new Map();
    frienshipList.forEach(friendship => {
        let key = generateFriendshipKey(friendship);
        friendshipsMap.set(key, true);
    });
    return friendshipsMap;
}
exports.generateFriendshipsMap = generateFriendshipsMap;
function dfaAlgorithm(firstNode, lastNode, visitNodes, bucketNodes, friendshipsMap) {
    visitNodes.set(firstNode, true);
    let nodeFriends = bucketNodes.filter(node => {
        let key = generateFriendshipKey({ userAddress1: node, userAddress2: firstNode });
        return friendshipsMap.has(key);
    });
    let i = 0;
    let foundLastNode = false;
    while (!foundLastNode && i < nodeFriends.length) {
        let currentFriend = nodeFriends[i];
        if (currentFriend === lastNode)
            return true;
        if (!visitNodes.has(currentFriend)) {
            foundLastNode = dfaAlgorithm(currentFriend, lastNode, visitNodes, bucketNodes, friendshipsMap);
        }
        i++;
    }
    return foundLastNode;
}
function existPathInBucket(friendship, friendshipsMap, bucket) {
    let visitNodes = new Map();
    console.log('entre a existPathInBucket');
    return dfaAlgorithm(friendship.userAddress1, friendship.userAddress2, visitNodes, bucket, friendshipsMap);
}
exports.existPathInBucket = existPathInBucket;
//# sourceMappingURL=usersFunctions.js.map