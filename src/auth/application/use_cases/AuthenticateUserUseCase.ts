import { AuthenticateUserDTO } from "../dtos/authenticate_user_dto";
import { AuthService } from "../../services/authService";



/**
 * Use case for authenticating a user.
 */
export class AuthenticateUserUseCase {
    /**
     * Constructs an instance of AuthenticateUserUseCase.
     * @param authService - The authentication service to be used.
     */
    constructor(private authService: AuthService) {}

    /**
     * Executes the user authentication process.
     * @param authenticateUserDTO - Data transfer object containing user authentication details.
     * @returns A promise that resolves to a string, typically a token or session identifier.
     */
    public async execute(authenticateUserDTO: AuthenticateUserDTO): Promise<string> {
        return this.authService.authenticate(authenticateUserDTO);
    }
}
