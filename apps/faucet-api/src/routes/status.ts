import express from 'express';
import { status } from '../controllers';

export const statusRouter = express.Router();

statusRouter.get('/', status);
