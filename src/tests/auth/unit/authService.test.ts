import { AuthService} from "../../../auth/services/authService";
import { MongooseUserRepository} from "../../../auth/infraestructure/database/user_repository";
import { RegisterUserDTO } from "../../../auth/application/dtos/register_user_dto";

const mockUserRepository = {
  save: jest.fn(),
  findByEmail: jest.fn(),
  findByGoogleId: jest.fn()
};

describe('AuthService - registerUser', () => {
  const authService = new AuthService(mockUserRepository);

  it('should register a user successfully', async () => {
    // Simulamos que el usuario no existe
    mockUserRepository.findByEmail.mockResolvedValue(null);

    // Simulamos que `save` es una operación que no devuelve nada (void)
    mockUserRepository.save.mockResolvedValue(undefined);

    // Ejecutamos el caso de uso (no esperamos ningún valor de retorno)
    await authService.register(new RegisterUserDTO('test@example.com', 'password123', 'user'));

    // Validamos que `findByEmail` y `save` se llamaron correctamente
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if user already exists', async () => {
    // Simulamos que el usuario ya existe
    mockUserRepository.findByEmail.mockResolvedValue({ id: 'existingUserId', email: 'test@example.com' });
  
    // Verificamos que se arroje el error adecuado
    await expect(
      authService.register(new RegisterUserDTO('test@example.com', 'password123', 'user'))
    ).rejects.toThrow('User with this email already exists');
  });
});



