import { Response, Request, NextFunction } from 'express';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const { password } = req.body;

  if (password !== ADMIN_PASSWORD) {
    res.status(403).json({ message: 'access denied' });
    return;
  }

  next();
};
