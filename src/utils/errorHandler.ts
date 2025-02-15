import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err && typeof err === 'object' && 'status' in err) {
    const status = (err as { status: number }).status;
    const message = (err as { message: string }).message;

    res.status(status).json({ error: message });
    return;
  }

  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
};
