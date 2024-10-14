
/**
 * Represents an email value object.
 * Ensures the email format is valid upon instantiation.
 */
export class Email {
    private _value: string;

    /**
     * Creates an instance of Email.
     * @param value - The email address as a string.
     * @throws Will throw an error if the email format is invalid.
     */
    constructor(value: string) {
        this.validate(value);
        this._value = value;
    }

    /**
     * Validates the email format.
     * @param value - The email address to validate.
     * @throws Will throw an error if the email format is invalid.
     */
    private validate(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format');
        }
    }

    /**
     * Retrieves the email value.
     * @returns The email address as a string.
     */
    public getValue(): string {
        return this._value;
    }
}
