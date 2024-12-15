import { RoutineService } from "../../service/routineService";
import { RoutineResponseDTO } from "../dtos/RoutineDTO";

export class GetUserRoutinesUseCase {
  constructor(private readonly routineService: RoutineService) {}

  public async execute(userId: string): Promise<RoutineResponseDTO[]> {
    return this.routineService.getUserRoutines(userId);
  }
}
