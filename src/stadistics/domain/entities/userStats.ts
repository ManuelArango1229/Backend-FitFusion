import { statsData } from "../value_objects/stats";

class UserStats {
  private readonly _userId: string;
  private readonly _currentStats: statsData;
  private readonly _statsHistory: statsData[];

  constructor(
    userId: string,
    currentStats: statsData,
    statsHistory: statsData[] = [],
  ) {
    if (!userId) throw new Error("User ID is required");
    this._userId = userId;
    this._currentStats = { ...currentStats };
    this._statsHistory = statsHistory.map((stats) => ({ ...stats }));
  }

  public getUserId(): string {
    return this._userId;
  }

  public getCurrentStats(): statsData {
    return { ...this._currentStats };
  }

  public getStatsHistory(): statsData[] {
    return this._statsHistory.map((stats) => ({ ...stats }));
  }
}

export default UserStats;
