import { MongooseUserRepository } from '../database/user_repository';
import { User, UserRole } from '../../domain';
import { Email } from '../../domain/value_objects/email'; // Asegúrate de importar el tipo correcto
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Crear instancia del repositorio de usuarios
const userRepository = new MongooseUserRepository();

console.log('Configurando estrategia de autenticación de Google...');
console.log('Credenciales google')
console.log( process.env.GOOGLE_CLIENT_ID);
console.log( process.env.GOOGLE_CLIENT_SECRET);

// Configurar la estrategia de Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {

      try {
        // Buscar si el usuario ya existe por su Google ID
        const existingUser = await userRepository.findByGoogleId(profile.id);
        console.log(existingUser)

        if (existingUser) {
          // Usuario ya registrado, retorna el usuario existente
          console.log(`Usuario existente encontrado: ${existingUser.getId()}`);
          return done(null, existingUser);
        }

        // Crear un nuevo usuario basado en el perfil de Google
        const newUser = new User(
          profile.emails && profile.emails.length > 0 
            ? new Email(profile.emails[0].value) // Crear una instancia de Email
            : null,
          null, // No hay contraseña ya que se autenticará con Google
          'USER' as UserRole, // Asignar un rol por defecto
          profile.id // Google ID
        );

        // Guardar el nuevo usuario en el repositorio
        await userRepository.save(newUser);
        console.log(`Nuevo usuario creado: ${newUser.getId()}`);
        return done(null, newUser); // Retorna el nuevo usuario
      } catch (error) {
        console.error('Error al procesar la autenticación de Google:', error);
        return done(error); // Manejar error
      }
    }
  )
);

// Serialización del usuario (almacenamos el id en la sesión)
passport.serializeUser((user: any, done) => {
  console.log(`Serializando usuario con ID: ${user.getId()}`); // Usa getId() para acceder al ID
  done(null, user.getId());
});

// Deserialización del usuario (obtenemos el usuario completo de la base de datos)
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userRepository.findByGoogleId(id); // Busca al usuario por su Google ID
    console.log(`Deserializando usuario con ID: ${id}`);
    done(null, user); // Retorna el usuario completo
  } catch (error) {
    console.error('Error al deserializar el usuario:', error);
    done(error, null); // Manejar error
  }
});

// Exportar la función para configurar la estrategia
export const googleAuth = () => {
  console.log('Google Strategy configurada');
};
