import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email?: string;
  password?: string;
  googleId?: string;
  role: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  googleId: { type: String, sparse: true },
  role: { type: String, required: true, enum: ['USER', 'TRAINER', 'ADMIN'] },
},
  { timestamps: true });

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
