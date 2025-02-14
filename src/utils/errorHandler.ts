import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { HttpError } from './httpError';

export const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof HttpError) {
        res.status(err.status).json({ error: err.message }); 
        return; 
    }

    console.error(err); 
    res.status(500).json({ error: 'Internal Server Error' });
};
