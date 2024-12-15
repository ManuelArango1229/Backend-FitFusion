import { RoutineRepository } from "../domain/repositories/routinesRepository";
import { CreateRoutineDTO, RoutineResponseDTO } from "../application/dtos/RoutineDTO";
import { Routine } from "../domain/entities/routine";

export class RoutineService {
  constructor(private readonly routineRepository: RoutineRepository) {}

  public async createRoutine(dto: CreateRoutineDTO): Promise<RoutineResponseDTO> {
    const routine = new Routine(
      "", 
      dto.userId,
      dto.name,
      dto.description,
      dto.dailyRoutines
    );

    await this.routineRepository.save(routine);

    return this.toResponseDTO(routine);
  }

  public async getUserRoutines(userId: string): Promise<RoutineResponseDTO[]> {
    const routines = await this.routineRepository.findByUserId(userId);
    return routines.map(this.toResponseDTO);
  }

  public async deleteRoutine(routineId: string): Promise<void> {
    await this.routineRepository.delete(routineId);
  }

  private toResponseDTO(routine: Routine): RoutineResponseDTO {
    return {
      id: routine.getId(),
      userId: routine.getUserId(),
      name: routine.getName(),
      description: routine.getDescription(),
      dailyRoutines: routine.getDailyRoutines(),
    };
  }
}

