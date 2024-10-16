
import { Email, Password, UserRole } from "../index";
/**
 * Represents a user in the system.
 */
export class User {
  private _id?: string;
  private _googleId?: string;
  private _email: Email;
  private _password: Password | null;
  private _role: UserRole;

  /**
   * Creates a new User.
   * @param {Email} email - Email of the user.
   * @param {Password} password - Password of the user.
   * @param {UserRole} role - Rol of the user (ej: UserRole.USER).
   */
  constructor(email: Email, password: Password | null, role: UserRole, googleId?: string) {
    this._email = email;
    this._password = password;
    this._role = role;
    if (googleId) {
      this._googleId = googleId;
    }
  }

  /**
   * Set the id of the user.
   * @param {string} id - Id of the user.
   */
  public setId(id: string): void {
    this._id = id;
  }

  /**
   * Get the id of the user.
   * @returns {string} Id of the user.
   */
  public getId(): string | undefined {
    return this._id;
  }

  /**
   * Set the googleId of the user.
   * @param {string} googleId - googleId of the user.
   */
  public setGoogleId(googleId: string): void {
    this._googleId = googleId;
  }

  /**
   * Get the googleId of the user.
   * @returns {string} googleId of the user.
   */
  public getGoogleId(): string | undefined {
    return this._googleId;
  }


  /**
   * Get the email of the user.
   * @returns {Email} Email of the user.
   */
  public getEmail(): Email {
    return this._email;
  }

  /**
   * Get the password of the user.
   * @returns {Password} Password of the user.
   */
  public getPassword(): Password | null {
    return this._password;
  }

  /**
   * Get the role of the user.
   * @returns {UserRole} role of the user.
   */
  public getRole(): UserRole {
    return this._role;
  }

  /**
   * Validate the password of the user.
   * @param {string} password - Password to validate.
   * @returns {boolean} True if the password is valid, false otherwise.
   */
  public validatePassword(password: string): boolean {
    // Lógica para validar la contraseña (recordar implementar hashing)
    if (this._password === null) {
      return false;
    }
    return this._password.getValue() === password;
  }
}

