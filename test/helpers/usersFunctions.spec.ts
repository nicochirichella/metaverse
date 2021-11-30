import { groupUsersByDate, getUnrepeatedUsersBuckets, dfaAlgorithm } from '../../src/helpers/usersFunctions';
import { UserState } from '../../src/entities/types';

function createUser(date: Date, address: string): UserState {
    return {date, userAddress: address};
}

describe('usersFunctionsHelper', () => {
    describe('groupUsersByDateFunction', () => {
        it('should return an empty map if there are no users', () =>{
            let users: UserState[] = [];
            let spectedResult: Map<string, string[]> = new Map<string, string[]>();
            let usersGroupedByDate = groupUsersByDate(users);

            expect(spectedResult).toEqual(usersGroupedByDate);
        });

        it('should return 1 buckets if there is only 1 user', () =>{
            let firstUser: UserState = createUser(new Date('2021-12-01'), 'address1');
            let users: UserState[] = [firstUser];
            
            let spectedResult: Map<string, string[]> = new Map<string, string[]>();
            spectedResult.set(firstUser.date.toLocaleString(), [firstUser.userAddress]);
            
            let usersGroupedByDate = groupUsersByDate(users);

            expect(spectedResult).toEqual(usersGroupedByDate);
        });

        it('should return 2 buckets if there are 2 diff dates', () =>{
            let firstUser: UserState = createUser(new Date('2021-12-01'), 'address1');
            let secondUser: UserState = createUser(new Date('2021-12-01'), 'address2');
            let thirdUser: UserState = createUser(new Date('2021-12-09'), 'address3');
            let users: UserState[] = [firstUser, secondUser, thirdUser];
            
            let spectedResult: Map<string, string[]> = new Map<string, string[]>();
            spectedResult.set(firstUser.date.toLocaleString(), [firstUser.userAddress, secondUser.userAddress]);
            spectedResult.set(thirdUser.date.toLocaleString(), [thirdUser.userAddress]);
            
            let usersGroupedByDate = groupUsersByDate(users);

            expect(spectedResult).toEqual(usersGroupedByDate);
        });
    });

    describe('getUnrepeatedUsersBuckets', () => {
        it('should return same amount of buckets if there are no repetitions', () => {
            let buckets: Map<string, string[]> = new Map<string, string[]>();
            buckets.set('day1', ['add1','add2']);
            buckets.set('day2', ['add1','add2','add3']);

            let unrepeatedBuckets = getUnrepeatedUsersBuckets(buckets);

            let expetedResult = [['add1','add2'], ['add1','add2','add3']];
            expect(unrepeatedBuckets).toEqual(expetedResult);
        });

        it('should filter the repeated buckets and only contain 1 without repetitions', () => {
            let buckets: Map<string, string[]> = new Map<string, string[]>();
            buckets.set('day1', ['add1','add2']);
            buckets.set('day2', ['add1','add2']);
            buckets.set('day3', ['add1','add2']);

            let unrepeatedBuckets = getUnrepeatedUsersBuckets(buckets);

            let expetedResult = [['add1','add2']];
            expect(unrepeatedBuckets).toEqual(expetedResult);
        });

        it('should filter all the repeated buckets and return only one of each different bucket', () => {
            let buckets: Map<string, string[]> = new Map<string, string[]>();
            buckets.set('day1', ['add1','add2']);
            buckets.set('day2', ['add1','add2', 'add3']);
            buckets.set('day3', ['add1','add2']);
            buckets.set('day4', ['add1','add2', 'add3']);

            let unrepeatedBuckets = getUnrepeatedUsersBuckets(buckets);

            let expetedResult = [['add1','add2'], ['add1','add2','add3']];
            expect(unrepeatedBuckets).toEqual(expetedResult);
        });
    });

    describe('dfaAlgorithm', () => {
        let visitNodes: Map<string, boolean>;
        let friendshipsMap: Map<string, boolean>
        let bucket: string[];

        beforeEach(()=> {
            visitNodes = new Map<string, boolean>();
            friendshipsMap = new Map<string, boolean>();
            bucket = ['A', 'B', 'C'];
        });

        it('with bucket [A,B,C] and NO friendships then dfa(A,C) should be FALSE', () => {
            let result: boolean = dfaAlgorithm('A', 'C', visitNodes, bucket, friendshipsMap);
            expect(result).toBeFalsy();
        })

        it('with bucket [A,B,C] and with friendships [A => B] then dfa(A,C) should be FALSE', () => {
            friendshipsMap.set('A-B', true);
            let result: boolean = dfaAlgorithm('A', 'C', visitNodes, bucket, friendshipsMap);
            expect(result).toBeFalsy();
        })

        it('with bucket [A,B,C] and with friendships [B => C] then dfa(A,C) should be FALSE', () => {
            friendshipsMap.set('B-C', true);
            let result: boolean = dfaAlgorithm('A', 'C', visitNodes, bucket, friendshipsMap);
            expect(result).toBeFalsy();
        })

        it('with bucket [A,B,C] and with friendships [A => B, B => C] then dfa(A,C) should be TRUE', () => {
            friendshipsMap.set('A-B', true);
            friendshipsMap.set('B-C', true);

            let result: boolean = dfaAlgorithm('A', 'C', visitNodes, bucket, friendshipsMap);
            expect(result).toBeTruthy();
        })

        it('with bucket [A,B,C,D] and with friendships [A => B, B => C] then dfa(A,D) should be FALSE', () => {
            friendshipsMap.set('A-B', true);
            friendshipsMap.set('B-C', true);
            
            let result: boolean = dfaAlgorithm('A', 'D', visitNodes, bucket, friendshipsMap);
            expect(result).toBeFalsy();
        })

        it('with bucket [A,B,C,D] and with friendships [A => B, B => C, C => D] then dfa(A,D) should be TRUE', () => {
            friendshipsMap.set('A-B', true);
            friendshipsMap.set('B-C', true);
            friendshipsMap.set('C-D', true);
            bucket.push('D');
            
            let result: boolean = dfaAlgorithm('A', 'D', visitNodes, bucket, friendshipsMap);
            expect(result).toBeTruthy();
        })

        it('with bucket [A,B,C,D] and with friendships [A => B, B => D] then dfa(A,D) should be TRUE', () => {
            friendshipsMap.set('A-B', true);
            friendshipsMap.set('B-D', true);
            bucket.push('D');
            
            let result: boolean = dfaAlgorithm('A', 'D', visitNodes, bucket, friendshipsMap);
            expect(result).toBeTruthy();
        })
    })
})