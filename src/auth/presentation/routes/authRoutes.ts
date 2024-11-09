import { Router } from "express";
import { AuthController } from "../controllers/userController";
import { RegisterUserDTO } from "../../application/dtos/register_user_dto";
import { AuthenticateUserDTO } from "../../application/dtos/authenticate_user_dto";
import {
  RegisterUserUseCase,
  AuthenticateUserUseCase,
} from "../../application/use_cases";
import { AuthService } from "../../services/authService";
import { MongooseUserRepository } from "../../infraestructure/database/user_repository";
import { JWTService } from "../../services/jwtService";
import { authMiddleware } from "../../middlewares/authMiddleware";

const userRepository = new MongooseUserRepository();
const authService = new AuthService(userRepository);

const registerUserCase = new RegisterUserUseCase(authService);
const authenticateUserCase = new AuthenticateUserUseCase(authService);
const jwtService = new JWTService();

const authRouter = Router();
const authController = new AuthController(
  authenticateUserCase,
  registerUserCase,
  jwtService,
);

authRouter.post("/register", (req, res) => {
  const registerData: RegisterUserDTO = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };

  authController.register(req, res, registerData);
});

authRouter.post("/login", (req, res) => {
  const loginData: AuthenticateUserDTO = {
    email: req.body.email,
    password: req.body.password,
  };

  authController.authenticate(req, res, loginData);
});

// Ruta protegida que requiere autenticación
authRouter.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({ message: "User profile" });
});

authRouter.get("/google", (req, res) => authController.googleAuth(req, res));
authRouter.get("/google/callback", (req, res) =>
  authController.googleAuthCallback(req, res),
);

authRouter.post("/logout", (req, res) => authController.logout(req, res));

// Exportar el router
export default authRouter;
