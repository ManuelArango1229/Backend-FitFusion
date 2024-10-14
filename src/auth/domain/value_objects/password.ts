
/**
 * Represents a Password value object.
 * Ensures that the password meets the required validation criteria.
 */
export class Password {
    private _value: string;

    /**
     * Creates an instance of Password.
     * @param value - The password string to be validated and stored.
     * @throws Will throw an error if the password is less than 6 characters long.
     */
    constructor(value: string) {
        this.validate(value);
        this._value = value;
    }

    /**
     * Validates the password string.
     * @param value - The password string to be validated.
     * @throws Will throw an error if the password is less than 6 characters long.
     */
    private validate(value: string) {
        if (value.length < 6) {
            throw new Error('Password must be at least 6 characters long');
        }
    }

    /**
     * Retrieves the password value.
     * @returns The password string.
     */
    public getValue(): string {
        return this._value;
    }
}
