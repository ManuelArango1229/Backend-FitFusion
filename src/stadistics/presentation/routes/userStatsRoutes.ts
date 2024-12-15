import { Router } from "express";
import { UserStatsController } from "../controllers/userStatsController";
import { UpdateUserStatsDTO } from "../../application/dtos/update_user_stats_dto"
import { GetUserStatsDTO } from "../../application/dtos/get_user_stats_dto"
import { GetUserStatsUseCase } from "../../application/use_cases/GetUserStatsUseCase";
import { UpdateUserStatsUseCase } from "../../application/use_cases/UpdateUserStatsUseCase";
import { UserStatsService } from "../../service/UserStatsService";
import MongoUserStatsRepository from "../../infraestructure/database/mongoStatsRepository";

const userStatsRepository = new MongoUserStatsRepository();
const userStatsService = new UserStatsService(userStatsRepository);

const getUserStatsUseCase = new GetUserStatsUseCase(userStatsService);
const updateUserStatsUseCase = new UpdateUserStatsUseCase(userStatsService);

const userStatsRouter = Router();

const userStatsController = new UserStatsController(
    getUserStatsUseCase,
    updateUserStatsUseCase
);

userStatsRouter.post("/", (req, res) => {
    userStatsController.getUserStats(req,res);
})

userStatsRouter.put("/", (req, res) => {
    userStatsController.updateUserStats(req,res);
})

export default userStatsRouter;