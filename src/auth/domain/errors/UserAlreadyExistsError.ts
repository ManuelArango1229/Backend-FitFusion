import { UserError } from "./UserError";


/**
 * @class UserAlreadyExistsError
 * @extends {UserError}
 * 
 * Error thrown when attempting to create a user that already exists.
 * 
 * @param {string} email - The email of the user that already exists.
 * 
 * @example
 * throw new UserAlreadyExistsError('example@example.com');
 */
export class UserAlreadyExistsError extends UserError {
    constructor(email: string) {
        super(`User with email ${email} already exists.`);
        this.name = "UserAlreadyExistsError";
    }
}