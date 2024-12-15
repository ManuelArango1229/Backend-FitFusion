import { Routine } from "../entities/routine";

export interface RoutineRepository {
    save(routine: Routine): Promise<void>;
    findById(id: string): Promise<Routine | null>;
    findByUserId(userId: string): Promise<Routine[]>;
    delete(id: string): Promise<void>;
}
