import { UserError } from "./UserError";


/**
 * @class InvalidCredentialsError
 * @extends {UserError}
 * 
 * Represents an error that is thrown when the provided email or password is invalid.
 * 
 * @constructor
 * Creates an instance of InvalidCredentialsError with a predefined error message.
 */
export class InvalidCredentialsError extends UserError {
    constructor() {
        super("Invalid email or password.");
        this.name = "InvalidCredentialsError";
    }
}