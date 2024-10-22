

import { Email, Password, User, UserRepository, UserRole } from "../../domain";
import UserModel from "./models/userModel";


export class MongooseUserRepository implements UserRepository {
  async save(user: User): Promise<void> {

    const newUser = new UserModel({
      email: user.getEmail()?.getValue(),
      password: user.getPassword()?.getValue(),
      googleId: user.getGoogleId(),
      role: user.getRole()
    });
    await newUser.save();
    user.setId(newUser._id.toString());
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email });
    if (userDoc) {
      if (!userDoc.email) {
        throw new Error("Email is required but missing from the user document");
      }
      if (!userDoc.password) {
        throw new Error("Password is required but missing from the user document");

      }
      const user = new User(new Email(userDoc.email), new Password(userDoc.password), userDoc.role as UserRole);
      user.setId(userDoc._id.toString());
      return user;
    }
    return null;
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ googleId });
    if (userDoc) {
      const email = userDoc.email ? new Email(userDoc.email) : null;
      const user = new User(email, null, userDoc.role as UserRole, userDoc.googleId)
      user.setId(userDoc._id.toString());
      return user;
    }
    return null;
  }
}
