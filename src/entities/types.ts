export interface FriendshipsRepository {
  create(friendship: Friendship): Promise<Friendship>;
  exists(friendship: Friendship): Promise<boolean>;
  getAll(): Promise<Friendship[]>;
}

export interface UsersPositionHistoryRepository {
  create(userState: UserState): Promise<UserState>;
  createInBulk(usersStates: UserState[]): Promise<UserState[]>;
  getAll(): Promise<UserState[]>;
  getUsersPositionsForFriendshipSuggestion(friendship: Friendship): Promise<UserState[]>;
}

export type Friendship = {
  userAddress1: string;
  userAddress2: string;
};

export type Position = {
  x: number;
  y: number;
};

export type UserState = {
  userAddress: string;
  position?: Position;
  date?: Date;
};

export type usersUpdateRequest = {
  moved: {
    id: string;
    position: Position;
  }[];
  disconnected: string[];
}
