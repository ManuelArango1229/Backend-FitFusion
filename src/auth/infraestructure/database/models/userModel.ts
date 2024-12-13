import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  email?: string;
  password?: string;
  googleId?: string;
  role: string;
  name: string;
  birthdate: string;
  phone: string;
}

const userSchema: Schema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
  googleId: { type: String, sparse: true },
  role: { type: String, required: true, enum: ['USER', 'TRAINER', 'ADMIN'] },
  name: { type: String },
  birthdate: { type: String },
  phone: { type: String}
},
  { timestamps: true });

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
