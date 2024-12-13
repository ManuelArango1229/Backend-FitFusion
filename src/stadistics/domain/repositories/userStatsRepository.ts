import UserStats from "../entities/userStats";

export interface userStatsRepository {
  save(Stats: UserStats): Promise<void>;
  findById(id: string): Promise<UserStats | null>;
}
