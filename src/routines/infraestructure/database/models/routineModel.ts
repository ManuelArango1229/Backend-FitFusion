import mongoose, { Schema, Document } from "mongoose";

// Subdocumento: Exercise
const ExerciseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  equipment: { type: String, required: true },
  type: { type: String, required: true },
  mechanics: { type: String, required: true },
  difficulty: { type: String, required: true },
  instructions: { type: Schema.Types.Mixed, required: true },
  imageUrl: { type: String, required: true },
});

// Subdocumento: DailyRoutine
const DailyRoutineSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  exercises: { type: [ExerciseSchema], required: true },
});

// Documento principal: Routine
const RoutineSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    dailyRoutines: { type: [DailyRoutineSchema], required: true },
  },
  {
    timestamps: true, // Añade campos createdAt y updatedAt automáticamente
  }
);

export const RoutineModel = mongoose.model("Routine", RoutineSchema);
