import { Request, Response } from 'express';
import { HttpException } from '@nyks-workspace/utils';

export function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response
) {
  const status = error.status || 500;
  const message = error.message || 'Something went wrong';
  console.error(
    `An error accrued in url: ${req.path} - path: ${req.route.path}`,
    error,
    { service: 'Middleware' }
  );
  return res.status(status).send({
    status,
    message,
  });
}
