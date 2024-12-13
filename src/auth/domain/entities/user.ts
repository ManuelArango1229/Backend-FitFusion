import { Email, Password, UserRole } from "../index";
/**
 * Represents a user in the system.
 */
export class User {
  private _id: string | null = null;
  private _googleId: string | null = null;
  private _email: Email | null = null;
  private _password: Password | null = null;
  private _role: UserRole;
  private _name: string | null = null;
  private _birthDate: string | null = null;
  private _phone: string | null = null;

  /**
   * Creates a new User.
   * @param {Email} email - Email of the user.
   * @param {Password} password - Password of the user.
   * @param {UserRole} role - Rol of the user (ej: UserRole.USER).
   */
  constructor(
    email: Email | null,
    password: Password | null,
    role: UserRole,
    name: string | null,
    birthDate: string | null,
    phone: string | null,
    googleId?: string,
  ) {
    this._email = email;
    this._password = password;
    this._role = role;
    this._name = name;
    this._birthDate = birthDate;
    this._phone = phone;
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
  public getId(): string | null {
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
  public getGoogleId(): string | null {
    return this._googleId;
  }
  /**
   * Get the email of the user.
   * @returns {Email} Email of the user.
   */
  public getEmail(): Email | null {
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
   * Get the name of the user.
   * @returns {string} name of the user.
   */
  public getName(): string | null {
    return this._name;
  }

  /**
   * Set the name of the user.
   * @param {string} name - name of the user.
   */ 
  public setName(name: string): void {
    this._name = name;  
  }

  public getBirthDate(): string | null {
    return this._birthDate;
  }

  public setBirthDate(birthDate: string): void {
    this._birthDate = birthDate;
  }

  public getPhone(): string | null {
    return this._phone;
  }

  public setPhone(phone: string): void {
    this._phone = phone;
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
