import mongoose, { Schema, Document } from "mongoose";
import { statsData } from "../../../domain/value_objects/stats";

export interface UserStatsDocument extends Document {
  userId: string;
  currentStats: statsData;
  statsHistory: statsData[];
}

const statsSchema = new Schema<statsData>({
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  measureBiceps: { type: Number, required: true },
  measureChest: { type: Number, required: true },
  measureHip: { type: Number, required: true },
  measureWaist: { type: Number, required: true },
  measureLeg: { type: Number, required: true },
  date: { type: Date, required: true},
});

const userStatsSchema = new Schema<UserStatsDocument>({
  userId: { type: String, required: true, unique: true },
  currentStats: { type: statsSchema, required: true },
  statsHistory: { type: [statsSchema], default: [] },
});

const UserStatsModel = mongoose.model<UserStatsDocument>(
  "UserStats",
  userStatsSchema,
);

export default UserStatsModel;
