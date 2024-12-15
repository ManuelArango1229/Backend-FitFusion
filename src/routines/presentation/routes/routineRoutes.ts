import { Router } from "express";
import { RoutineController } from "../controllers/routineController";
import { CreateRoutineUseCase } from "../../application/user_cases/createRoutineUseCase";
import { GetUserRoutinesUseCase } from "../../application/user_cases/getRoutineUseCase";
import { DeleteRoutineUseCase } from "../../application/user_cases/deleteRoutineUseCase";
import { RoutineService } from "../../service/routineService";
import { MongooseRoutineRepository } from "../../infraestructure/database/mongoRoutineRepository";


const routineRepository = new MongooseRoutineRepository();
const routineService = new RoutineService(routineRepository);

const createRoutineUseCase = new CreateRoutineUseCase(routineService);
const getUserRoutinesUseCase = new GetUserRoutinesUseCase(routineService);
const deleteRoutineUseCase = new DeleteRoutineUseCase(routineService);

const routineController = new RoutineController(
  createRoutineUseCase,
  getUserRoutinesUseCase,
  deleteRoutineUseCase
);

const routineRouter = Router();


routineRouter.post("/", (req, res) => {
  routineController.createRoutine(req, res);
});

routineRouter.get("/:userId", (req, res) => {
  routineController.getUserRoutines(req, res);
});

routineRouter.delete("/:routineId", (req, res) => {
  routineController.deleteRoutine(req, res);
});

export default routineRouter;
