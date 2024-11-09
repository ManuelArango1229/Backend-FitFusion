
import { Response, NextFunction } from 'express';
import { JWTService } from '../services/jwtService';
import { CustomRequest } from '../types/customRecuest';

const jwtService = new JWTService();

/**
 * Middleware to authenticate requests using a JWT token.
 *
 * @param req - The incoming request object, extended with custom properties.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * This middleware checks for the presence of an 'Authorization' header in the request.
 * If a token is provided, it attempts to decode it using the `jwtService.decodeToken` method.
 * If the token is valid, the user ID is attached to the request object and the next middleware is called.
 * If no token is provided or the token is invalid, a 401 Unauthorized response is sent.
 */
export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return; 
  }
  try {
    const decoded = jwtService.decodeToken(token);
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Invalid token' });
    return; 
  }
};
