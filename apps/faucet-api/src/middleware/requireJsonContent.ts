import type { Request, Response, NextFunction } from 'express';

export function requireJsonContentHandler(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (request.headers['content-type'] !== 'application/json') {
    return response.status(415).send('Content-type application/json expected');
  } else {
    next();
  }
}
