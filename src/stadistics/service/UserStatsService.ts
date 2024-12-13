import UserStats from "../domain/entities/userStats";
import { userStatsRepository } from "../domain/repositories/userStatsRepository";
import { UpdateUserStatsDTO } from "../application/dtos/update_user_stats_dto";
import { GetUserStatsDTO } from "../application/dtos/get_user_stats_dto";
import { statsData } from "../domain/value_objects/stats";

/**
 * Service for handling user statistics operations.
 */
export class UserStatsService {
  constructor(private statsRepository: userStatsRepository) {}

  /**
   * Retrieve the statistics for a user by their ID.
   * @param {string} userId - The ID of the user whose stats are to be retrieved
   * @returns {Promise<GetUserStatsDTO | null>} The user's stats or null if not found
   */
  public async getUserStats(userId: string): Promise<GetUserStatsDTO | null> {
    const userStats = await this.statsRepository.findById(userId);

    if (!userStats) {
      return null;
    }

    return {
      userId: userStats.getUserId(),
      currentStats: userStats.getCurrentStats(),
      statsHistory: userStats.getStatsHistory(),
    };
  }

  /**
   * Update the statistics of a user.
   * @param {UpdateUserStatsDTO} updateUserStatsDTO - DTO containing user ID and updated stats
   * @returns {Promise<void>} A promise that resolves when the stats are successfully updated
   * @throws {Error} If the user stats are not found
   */
  public async updateUserStats(updateUserStatsDTO: UpdateUserStatsDTO): Promise<void> {
    const { userId, stats } = updateUserStatsDTO;
    // Check if the user stats already exist
    const existingStats = await this.statsRepository.findById(userId);
    const newStats = {
      ...stats,
      date: new Date()
    }
    
    // If stats don't exist, create new stats
    if (!existingStats) {
      const newUserStats = new UserStats(
        userId,
        newStats,
        [] // Empty history initially
      );

      // Save the new stats to the repository
      await this.statsRepository.save(newUserStats);
      return;
    }

    const updatedStats = {
      ...stats,
      date: new Date(), 
    };

    const updatedEntity = new UserStats(
      userId,
      updatedStats,
      [
        ...existingStats.getStatsHistory(),
        existingStats.getCurrentStats(),
      ]
    );

    await this.statsRepository.save(updatedEntity);
  }
}
