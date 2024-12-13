import { UserStatsService } from "../../service/UserStatsService";



export class GetUserStatsUseCase {
  constructor(private userStatsService: UserStatsService) {}

  public async execute(userId: string) {
    return this.userStatsService.getUserStats(userId);
  }
}
