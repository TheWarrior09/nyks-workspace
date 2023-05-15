import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { requireJsonContentHandler } from '../middleware';
import { creditBalance } from '../controllers';

export const creditRouter = express.Router();

creditRouter.post('/', requireJsonContentHandler, creditBalance);

creditRouter.all(
  '/',
  (request: Request, response: Response, next: NextFunction) => {
    if (request.method !== 'POST') {
      response.status(405).send('This endpoint requires a POST request');
    } else {
      next();
    }
  }
);
