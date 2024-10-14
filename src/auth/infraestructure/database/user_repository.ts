

import { Email, Password, User, UserRepository, UserRole } from "../../domain";
import UserModel from "./models/userModel";


export class MongooseUserRepository implements UserRepository {
    async save(user: User): Promise<void> {

        const newUser = new UserModel({
            email: user.getEmail().getValue(),
            password: user.getPassword()?.getValue(),
            role: user.getRole()
        });
        await newUser.save();
        user.setId(newUser._id.toString()); 
    }

    async findByEmail(email: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ email });
        if (userDoc) {
            const user = new User(new Email(userDoc.email), new Password(userDoc.password), userDoc.role as UserRole);
            user.setId(userDoc._id.toString());
            return user;
        }
        return null;
    }
}
