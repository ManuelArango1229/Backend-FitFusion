/**
 * Data Transfer Object for user authentication.
 *
 * @class AuthenticateUserDTO
 * @property {string} email - The email address of the user.
 * @property {string} password - The password of the user.
 *
 * @constructor
 * @param {string} email - The email address of the user.
 * @param {string} password - The password of the user.
 */
export class AuthenticateUserDTO {
  public email: string;
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
