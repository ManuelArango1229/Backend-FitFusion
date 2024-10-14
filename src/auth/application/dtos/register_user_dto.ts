
/**
 * Data Transfer Object for registering a new user.
 */
export class RegisterUserDTO {
    /**
     * The email address of the user.
     */
    public email: string;

    /**
     * The password for the user's account.
     */
    public password: string;

    /**
     * The role assigned to the user.
     */
    public role: string;

    /**
     * Constructs a new RegisterUserDTO.
     * 
     * @param email - The email address of the user.
     * @param password - The password for the user's account.
     * @param role - The role assigned to the user.
     */
    constructor(email: string, password: string, role: string) {
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
