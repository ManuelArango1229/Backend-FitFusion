import { Request } from 'express';


/**
 * @interface CustomRequest
 * @extends {Request}
 * 
 * CustomRequest extends the standard Request interface to include an optional userId property.
 * 
 * @property {string} [userId] - An optional property representing the ID of the user making the request.
 */
export interface CustomRequest extends Request {
    userId?: string;  
}
