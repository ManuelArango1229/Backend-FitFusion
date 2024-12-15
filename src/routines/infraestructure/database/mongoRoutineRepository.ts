import { RoutineRepository } from "../../domain/repositories/routinesRepository";
import { RoutineModel } from "./models/routineModel";
import { Routine } from "../../domain/entities/routine";

export class MongooseRoutineRepository implements RoutineRepository {
  public async save(routine: Routine): Promise<void> {
    const routineDocument = new RoutineModel({
      userId: routine.getUserId(),
      name: routine.getName(),
      description: routine.getDescription(),
      dailyRoutines: routine.getDailyRoutines(),
    });

    await routineDocument.save();
  }

  public async findById(id: string): Promise<Routine | null> {
    const routineDocument = await RoutineModel.findById(id).exec();

    if (!routineDocument) {
      return null;
    }

    return new Routine(
      routineDocument.id,
      routineDocument.userId,
      routineDocument.name,
      routineDocument.description,
      routineDocument.dailyRoutines
    );
  }

  public async findByUserId(userId: string): Promise<Routine[]> {
    const routineDocuments = await RoutineModel.find({ userId }).exec();

    return routineDocuments.map(doc =>
      new Routine(
        doc.id,
        doc.userId,
        doc.name,
        doc.description,
        doc.dailyRoutines
      )
    );
  }

  public async delete(id: string): Promise<void> {
    await RoutineModel.findByIdAndDelete(id).exec();
  }
}
