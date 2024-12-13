import { UserStatsService } from "../../service/UserStatsService";
import { UpdateUserStatsDTO } from "../dtos/update_user_stats_dto";

export class UpdateUserStatsUseCase {
  constructor(private userStatsService: UserStatsService) {}

  public async execute(updateUserStatsDTO: UpdateUserStatsDTO): Promise<void> {
    await this.userStatsService.updateUserStats(updateUserStatsDTO);
  }
}
