
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Service for handling JSON Web Tokens (JWT).
 */
export class JWTService {
    private secret: string;

    /**
     * Initializes the JWTService with a secret key.
     * The secret key is retrieved from the environment variable `JWT_SECRET`.
     * If the environment variable is not set, a default secret is used.
     */
    constructor() {
        this.secret = process.env.JWT_SECRET || 'default_secret';
    }

    /**
     * Generates a JWT token for a given user ID.
     * 
     * @param userId - The ID of the user for whom the token is generated.
     * @returns The generated JWT token as a string.
     */
    public generateToken(userId: string): string {
        return jwt.sign({ id: userId }, this.secret, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    }

    /**
     * Decodes a given JWT token without verifying its signature.
     * 
     * @param token - The JWT token to decode.
     * @returns The decoded token payload.
     */
    public decodeToken(token: string): any {
        const decode = jwt.decode(token);
        console.log(decode);
        return decode;
    }

    /**
     * Verifies a given JWT token and returns its payload if valid.
     * 
     * @param token - The JWT token to verify.
     * @returns The verified token payload.
     */
    public verifyToken(token: string): any {
        console.log(this.secret);
        return jwt.verify(token, this.secret);
    }
}
