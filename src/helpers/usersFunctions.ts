import { Friendship, UserState } from "../entities/types";

export function groupUsersByDate(usersInSamePositions: UserState[]): Map<string, string[]> {
    let groupByDate: Map<string, string[]> = new Map<string, string[]>();
  
    usersInSamePositions.forEach((userState: UserState) => {
      let key: string = userState.date ? userState.date.toLocaleString() : new Date().toDateString();
      if (groupByDate.has(key)){
        groupByDate.get(key)?.push(userState.userAddress);
      } else {
        groupByDate.set(key, [userState.userAddress]);
      }
    });
  
    return groupByDate;
}

export function getUnrepeatedUsersBuckets(usersBuckets: Map<string, string[]>): string[][]{
    let visitedBuckets: Map<string, boolean> = new Map<string, boolean>();  
    let bucketsWithoutRepetitions = [...usersBuckets.values()]
        .filter(bucket => {
        let key = bucket.join('-');
        if (visitedBuckets.has(key)) return false;
        visitedBuckets.set(key, true);
        return true;
        });
    return bucketsWithoutRepetitions;
}

export function generateFriendshipKey(friendship: Friendship): string {
    return [friendship.userAddress1, friendship.userAddress2].sort().join('-');
}

export function generateFriendshipsMap(frienshipList: Friendship[]): Map<string, boolean> {
    let friendshipsMap: Map<string, boolean> = new Map<string, boolean>();
    frienshipList.forEach(friendship => {
        let key: string = generateFriendshipKey(friendship);
        friendshipsMap.set(key, true);
    });

    return friendshipsMap;
}

function dfaAlgorithm(firstNode: string, lastNode: string, visitNodes: Map<string, boolean>,
                    bucketNodes: string[], friendshipsMap: Map<string, boolean>): boolean{
    visitNodes.set(firstNode, true);                        
    let nodeFriends: string[] = bucketNodes.filter(node => {
        let key = generateFriendshipKey({userAddress1: node, userAddress2: firstNode});
        return friendshipsMap.has(key);
    })

    let i = 0;
    let foundLastNode = false;

    while(!foundLastNode && i < nodeFriends.length) {
        let currentFriend = nodeFriends[i];
        if (currentFriend === lastNode) return true;
        if (!visitNodes.has(currentFriend)) {
                foundLastNode = dfaAlgorithm(currentFriend, lastNode, visitNodes, bucketNodes, friendshipsMap);
        }
        i++;
    }
    return foundLastNode;
}

export function existPathInBucket(friendship: Friendship, friendshipsMap: Map<string, boolean>, bucket: string[]): boolean {
    let visitNodes = new Map<string, boolean>();
    console.log('entre a existPathInBucket');
    return dfaAlgorithm(friendship.userAddress1, friendship.userAddress2, visitNodes, bucket, friendshipsMap);
}