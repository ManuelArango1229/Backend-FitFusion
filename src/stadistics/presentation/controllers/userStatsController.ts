import { Request, Response } from "express";
import { GetUserStatsUseCase } from "../../application/use_cases/GetUserStatsUseCase";
import { UpdateUserStatsUseCase } from "../../application/use_cases/UpdateUserStatsUseCase";
import { UpdateUserStatsDTO } from "../../application/dtos/update_user_stats_dto"
import { GetUserStatsDTO } from "../../application/dtos/get_user_stats_dto"

export class UserStatsController {
    constructor(
        private getUserStatsUseCase: GetUserStatsUseCase,
        private updateUserStatsUseCase: UpdateUserStatsUseCase,
      ) {}

    public async getUserStats(
        req: Request,
        res: Response,
    ): Promise<Response>{
        try{
            const userId = req.body.userId;
            const userStats = await this.getUserStatsUseCase.execute(userId);
            console.log(userStats);
            if(!userStats){
                return res.status(200).json("User stats not found");
            };
            return res.status(200).json(userStats);
        }catch(error){
            const getError = error as Error;
            return res.status(400).json({ message: getError.message });
        }

    }

    public async updateUserStats(
    req: Request,
    res: Response,
): Promise<Response>{
    try {
        const { userId, stats } = req.body;
  
        if (!userId || !stats) {
          return res.status(400).json({ message: "User ID and stats are required" });
        }
  
        await this.updateUserStatsUseCase.execute({ userId, stats });
  
        return res.status(200).json({ message: "User stats updated successfully" });
      } catch (error) {
        const getError = error as Error;
        return res.status(400).json({ message: getError.message });
      }   
}
}