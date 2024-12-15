import { RoutineService } from "../../service/routineService";
import { CreateRoutineDTO, RoutineResponseDTO } from "../dtos/RoutineDTO";

export class CreateRoutineUseCase {
  constructor(private readonly routineService: RoutineService) {}

  public async execute(dto: CreateRoutineDTO): Promise<RoutineResponseDTO> {
    return this.routineService.createRoutine(dto);
  }
}
