/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const pickToken = <string>req.header('authorization');
  if (!pickToken) {
    return res.status(403).json({
      auth: false,
      err: 'no token',
    });
  }
  try {
    jwt.verify(
      pickToken,
      process.env.SECRET_KEY || 'authorization',
      (err: any, result: any) => {
        if (err) {
          return res.status(404).json({
            auth: false,
            message: 'invalid token',
          });
        }
        if (!err) {
          req.userId = result.id;
        }
      },
    );

    next();
  } catch (error) {
    next(error);
  }
}
