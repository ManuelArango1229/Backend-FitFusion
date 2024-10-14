import { RegisterUserDTO } from "../dtos/register_user_dto";
import { AuthService } from "../../services/authService";

/**
 * Use case for registering a new user.
 */
export class RegisterUserUseCase {
    /**
     * Constructs a new RegisterUserUseCase.
     * @param authService - The authentication service to handle user registration.
     */
    constructor(private authService: AuthService) {}

    /**
     * Executes the user registration process.
     * @param registerUserDTO - Data transfer object containing user registration details.
     * @returns A promise that resolves when the user is successfully registered.
     */
    public async execute(registerUserDTO: RegisterUserDTO): Promise<void> {
        return this.authService.register(registerUserDTO);
    }
}
