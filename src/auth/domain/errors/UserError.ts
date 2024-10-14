/**
 * Represents an error specific to user-related operations.
 * Extends the built-in `Error` class to provide additional context.
 *
 * @remarks
 * This error is typically thrown when there is an issue related to user actions or data.
 *
 * @example
 * ```typescript
 * throw new UserError("User not found");
 * ```
 *
 * @param message - A descriptive error message.
 */
export class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserError";
    }
}