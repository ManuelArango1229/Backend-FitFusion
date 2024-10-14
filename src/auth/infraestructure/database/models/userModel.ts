// infrastructure/database/mongoose/models/UserModel.ts
import mongoose, { Document, Schema } from 'mongoose';

// Define la interfaz IUser que extiende Document
export interface IUser extends Document {
    _id: string; 
    email: string;
    password: string;
    role: string;
}

// Crea el esquema para el modelo de usuario
const userSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Requerido para todos los usuarios
    role: { type: String, required: true, enum: ['USER', 'TRAINER', 'ADMIN'] }, // Enum para los roles
}, { timestamps: true }); // Agrega timestamps para createdAt y updatedAt

// Crea el modelo de usuario basado en el esquema
const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
