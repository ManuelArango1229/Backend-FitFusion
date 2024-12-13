import { AuthService } from "../../../auth/services/authService";
import { MongooseUserRepository } from "../../../auth/infraestructure/database/user_repository";
import { RegisterUserDTO } from "../../../auth/application/dtos/register_user_dto";

const mockUserRepository = {
  save: jest.fn(),
  findByEmail: jest.fn(),
  findByGoogleId: jest.fn(),
};

describe("AuthService - registerUser", () => {
  const authService = new AuthService(mockUserRepository);

  it("should register a user successfully", async () => {
    mockUserRepository.findByEmail.mockResolvedValue(null);

    mockUserRepository.save.mockResolvedValue(undefined);

    await authService.register(
      new RegisterUserDTO("test@example.com", "password123", "user"),
    );

    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      "test@example.com",
    );
    expect(mockUserRepository.save).toHaveBeenCalledTimes(1);
  });

  it("should throw an error if user already exists", async () => {
    mockUserRepository.findByEmail.mockResolvedValue({
      id: "existingUserId",
      email: "test@example.com",
    });

    await expect(
      authService.register(
        new RegisterUserDTO("test@example.com", "password123", "user"),
      ),
    ).rejects.toThrow("User with this email already exists");
  });
});
