import type { Request, Response } from 'express';

export function invalidPathHandler(request: Request, response: Response) {
  return response.status(404).send('invalid path');
}
