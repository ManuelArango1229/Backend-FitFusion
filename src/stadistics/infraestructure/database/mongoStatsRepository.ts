import UserStatsModel, { UserStatsDocument } from "./models/userStatsModel";
import { userStatsRepository } from "../../domain/repositories/userStatsRepository";
import UserStats from "../../domain/entities/userStats";
import { statsData } from "../../domain/value_objects/stats";

class MongoUserStatsRepository implements userStatsRepository {
  async findById(userId: string): Promise<UserStats | null> {
    const userStatsDoc = await UserStatsModel.findOne({ userId }).lean().exec();

    if (!userStatsDoc) {
      return null;
    }

    return new UserStats(
      userStatsDoc.userId,
      userStatsDoc.currentStats,
      userStatsDoc.statsHistory,
    );
  }

  async save(userStats: UserStats): Promise<void> {
    const userId = userStats.getUserId();
    const currentStats = userStats.getCurrentStats();
    const statsHistory = userStats.getStatsHistory();

    await UserStatsModel.updateOne(
      { userId },
      {
        userId,
        currentStats,
        statsHistory,
      },
      { upsert: true }, // Crear si no existe
    );
  }
}

export default MongoUserStatsRepository;
