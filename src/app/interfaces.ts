import { FriendshipsRepository, UsersPositionHistoryRepository } from "../entities/types";

export type Logger = {
  info(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
};

export type AppComponents = {
  friendshipsRepo: FriendshipsRepository;
  usersPositionHistoryRepo: UsersPositionHistoryRepository;
  logger: Logger;
};
