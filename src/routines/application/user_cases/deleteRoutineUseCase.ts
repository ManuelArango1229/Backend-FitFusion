import { RoutineService } from "../../service/routineService";

export class DeleteRoutineUseCase {
  constructor(private readonly routineService: RoutineService) {}

  public async execute(routineId: string): Promise<void> {
    return this.routineService.deleteRoutine(routineId);
  }
}
