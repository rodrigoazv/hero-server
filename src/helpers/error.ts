import { Request, Response, NextFunction } from 'express';
import { SchemaError } from './schema-validation';
import { AuthFail } from '../middlewares/verify-token-handler';

interface ErrorType {
  content: {
    type: string;
    message: string;
  };
  status: number;
}
export class NotFound extends Error {}

// eslint-disable-next-line consistent-return
export async function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(error);
  let errorBody: ErrorType = {
    content: {
      type: 'InternalError',
      message: 'Erro interno',
    },
    status: 500,
  };

  if (error instanceof NotFound) {
    errorBody = {
      content: {
        type: NotFound.name,
        message: error.message,
      },
      status: 404,
    };
  }
  if (error instanceof SchemaError) {
    errorBody = {
      content: {
        type: SchemaError.name,
        message: error.message,
      },
      status: 404,
    };
  }
  if (error instanceof AuthFail) {
    errorBody = {
      content: {
        type: AuthFail.name,
        message: error.message,
      },
      status: 404,
    };
  }
  return res.status(errorBody.status).json({ error: errorBody.content });
}
