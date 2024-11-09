import { MongooseUserRepository } from '../database/user_repository';
import { User, UserRole } from '../../domain';
import { Email } from '../../domain/value_objects/email'; // Asegúrate de importar el tipo correcto
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();
const userRepository = new MongooseUserRepository();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {

      try {
        const existingUser = await userRepository.findByGoogleId(profile.id);
        if (existingUser) {
          return done(null, existingUser);
        }
        const newUser = new User(
          profile.emails && profile.emails.length > 0 
            ? new Email(profile.emails[0].value) 
            : null,
          null, 
          'USER' as UserRole, 
          profile.id 
        );

        await userRepository.save(newUser);
        return done(null, newUser);
      } catch (error) {
        return done(error); 
      }
    }
  )
);


