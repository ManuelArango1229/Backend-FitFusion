
import { Request, Response } from 'express';
import { AuthenticateUserUseCase, RegisterUserUseCase } from '../../application/use_cases';
import { RegisterUserDTO } from '../../application/dtos/register_user_dto';
import { AuthenticateUserDTO } from '../../application/dtos/authenticate_user_dto';
import { JWTService } from '../../services/jwtService';


/**
 * Controller responsible for handling authentication-related requests.
 */
export class AuthController {
    /**
     * Creates an instance of AuthController.
     * @param authenticateUserUseCase - Use case for authenticating a user.
     * @param registerUserUseCase - Use case for registering a new user.
     * @param jwtService - Service for handling JWT operations.
     */
    constructor(
        private authenticateUserUseCase: AuthenticateUserUseCase,
        private registerUserUseCase: RegisterUserUseCase,
        private jwtService: JWTService,
    ) {}

    /**
     * Authenticates a user based on the provided login data.
     * @param req - The request object.
     * @param res - The response object.
     * @param loginData - Data transfer object containing login credentials.
     * @returns A promise that resolves to a response object.
     */
    public async authenticate(req: Request, res: Response, loginData: AuthenticateUserDTO): Promise<Response> {
        try {
            const { email, password } = req.body;
            const user = await this.authenticateUserUseCase.execute({ email, password });
            const token = this.jwtService.generateToken(user);
            return res.status(200).json({ token });
        } catch (error) {
            const getError = error as Error;
            return res.status(400).json({ message: getError.message });
        }
    }

    /**
     * Registers a new user based on the provided registration data.
     * @param req - The request object.
     * @param res - The response object.
     * @param registerData - Data transfer object containing registration details.
     * @returns A promise that resolves to a response object.
     */
    public async register(req: Request, res: Response, registerData: RegisterUserDTO): Promise<Response> {
        try {
            const { email, password, role } = req.body;
            await this.registerUserUseCase.execute({ email, password, role });
            return res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            const getError = error as Error;
            return res.status(400).json({ message: getError.message });
        }
    }
}








