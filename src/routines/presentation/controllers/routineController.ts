import { Request, Response } from "express";
import { CreateRoutineUseCase } from "../../application/user_cases/createRoutineUseCase";
import { GetUserRoutinesUseCase } from "../../application/user_cases/getRoutineUseCase";
import { DeleteRoutineUseCase } from "../../application/user_cases/deleteRoutineUseCase";
import { CreateRoutineDTO } from "../../application/dtos/RoutineDTO";

export class RoutineController {
  constructor(
    private createRoutineUseCase: CreateRoutineUseCase,
    private getUserRoutinesUseCase: GetUserRoutinesUseCase,
    private deleteRoutineUseCase: DeleteRoutineUseCase
  ) {}

  public async createRoutine(req: Request, res: Response): Promise<Response> {
    try {
      const routineData: CreateRoutineDTO = req.body;

      if (!routineData.userId || !routineData.name || !routineData.dailyRoutines) {
        return res.status(400).json({
          message: "User ID, name, and daily routines are required",
        });
      }

      const createdRoutine = await this.createRoutineUseCase.execute(routineData);

      return res.status(201).json(createdRoutine);
    } catch (error) {
      const getError = error as Error;
      return res.status(400).json({ message: getError.message });
    }
  }

  public async getUserRoutines(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const userRoutines = await this.getUserRoutinesUseCase.execute(userId);

      if (!userRoutines || userRoutines.length === 0) {
        return res.status(404).json({ message: "No routines found for this user" });
      }

      return res.status(200).json(userRoutines);
    } catch (error) {
      const getError = error as Error;
      return res.status(400).json({ message: getError.message });
    }
  }


  public async deleteRoutine(req: Request, res: Response): Promise<Response> {
    try {
      const { routineId } = req.params;

      if (!routineId) {
        return res.status(400).json({ message: "Routine ID is required" });
      }

      await this.deleteRoutineUseCase.execute(routineId);

      return res.status(200).json({ message: "Routine deleted successfully" });
    } catch (error) {
      const getError = error as Error;
      return res.status(400).json({ message: getError.message });
    }
  }
}
