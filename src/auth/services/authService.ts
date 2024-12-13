import { Email, Password, User, UserRepository, UserRole } from "../domain";
import { AuthenticateUserDTO } from "../application/dtos/authenticate_user_dto";
import { RegisterUserDTO } from "../application/dtos/register_user_dto";

/**
 * Service for handling user authentication and registration.
 */

export class AuthService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Authenticate a user using email and password
   * @param {AuthenticateUserDTO} authenticateUserDTO - DTO containing email and password
   * @returns {Promise<string>} The user's ID if authentication is successful
   * @throws {Error} If authentication fails
   */
  public async authenticate(
    authenticateUserDTO: AuthenticateUserDTO,
  ): Promise<User> {
    const { email, password } = authenticateUserDTO;
    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.validatePassword(password)) {
      throw new Error("Invalid credentials");
    }

    return user!;
  }

  /**
   * Register a new user in the system
   * @param {RegisterUserDTO} registerUserDTO - DTO containing email, password, and role
   * @returns {Promise<void>} A promise that resolves when the user is successfully registered
   * @throws {Error} If the registration fails (e.g., email already in use)
   */
  public async register(registerUserDTO: RegisterUserDTO): Promise<void> {
    const { email, password, role, name, birthdate, phone } = registerUserDTO;

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // Create new User entity
    const newUser = new User(
      new Email(email),
      password ? new Password(password) : null,
      role as UserRole,
      name,
      birthdate,
      phone
    );


    // Save user to repository
    await this.userRepository.save(newUser);
  }
}
