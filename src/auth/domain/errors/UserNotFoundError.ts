import { UserError } from "..";

/**
 * @class UserNotFoundError
 * @extends {UserError}
 * 
 * Custom error class representing a user not found error.
 * This error is thrown when a user with a specific ID cannot be found.
 * 
 * @param {string} id - The ID of the user that was not found.
 */
export class UserNotFoundError extends UserError {
    constructor(id: string) {
        super(`User with ID ${id} not found.`);
        this.name = "UserNotFoundError";
    }
}