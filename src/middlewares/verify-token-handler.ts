/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export class AuthFail extends Error {}

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const pickToken = <string>req.header('authorization');
  if (!pickToken) {
    throw new AuthFail('no token');
  }
  try {
    jwt.verify(
      pickToken,
      process.env.SECRET_KEY || 'authorization',
      (err: any, result: any) => {
        if (err) {
          throw new AuthFail('invalid token');
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
