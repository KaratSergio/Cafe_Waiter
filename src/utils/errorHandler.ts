import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

interface HttpError extends Error {
  status: number;
}

export const errorHandler: ErrorRequestHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): void => {
  if (err.status) {
    res.status(err.status).json({ error: err.message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};
