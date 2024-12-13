import { Request, Response } from "express";
import {
  AuthenticateUserUseCase,
  RegisterUserUseCase,
} from "../../application/use_cases";
import { RegisterUserDTO } from "../../application/dtos/register_user_dto";
import { AuthenticateUserDTO } from "../../application/dtos/authenticate_user_dto";
import { JWTService } from "../../services/jwtService";
import passport from "passport";
import { User } from "../../domain/entities/user";

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
  public async authenticate(
    req: Request,
    res: Response,
    loginData: AuthenticateUserDTO,
  ): Promise<Response> {
    try {
      const { email, password } = req.body;
      const user = await this.authenticateUserUseCase.execute({
        email,
        password,
      }); 
  
      const id = user.getId()!;
      const emailUser = user.getEmail()?.getValue();
      const passwordUser = user.getPassword()?.getValue();
      const role = user.getRole();
      const name = user.getName();
      const birthdate = user.getBirthDate();
      const phone = user.getPhone();
      const token = this.jwtService.generateToken(id);
      const responseUser = {
        id,
        emailUser,
        passwordUser,
        role,
        token,
        name,
        birthdate,
        phone
      }
      console.log(responseUser);

      return res.json(responseUser);
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
  public async register(
    req: Request,
    res: Response,
    registerData: RegisterUserDTO,
  ): Promise<Response> {
    try {
      const { email, password, role, name, birthdate, phone } = req.body;
      await this.registerUserUseCase.execute({ email, password, role, name, birthdate, phone });
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      const getError = error as Error;
      return res.status(400).json({ message: getError.message });
    }
  }

  /**
   * Initiates the Google authentication flow.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to a response object.
   */
  public googleAuth(req: Request, res: Response): void {
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
  }

  /**
   * Callback function for Google authentication.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to a response object.
   */
  public googleAuthCallback(req: Request, res: Response): void {
    passport.authenticate("google", { failureRedirect: "/" }, (err, user) => {
      if (err || !user) {
        console.log("Error de autenticación:", err);
        return res.status(401).json({ message: "Authentication failed" });
      }

      const userId = (user as User).getId();
      if (!userId) {
        throw new Error("No hay un id");
      }
      const token = this.jwtService.generateToken(userId);
      console.log(
        "Usuario autenticado:",
        (user as User).getEmail()?.getValue(),
      );
      res.status(200).redirect("http:localhost:5173/home");
    })(req, res);
  }
  /**
   * Logs out the currently authenticated user by destroying the session.
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to a response object.
   */
  public logout(req: Request, res: Response): void {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).json({ message: "Error destroying session" });
        }
        res.status(200).json({ message: "Logged out successfully" });
      });
    });
  }
}
