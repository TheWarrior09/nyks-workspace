import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { Faucet } from '../models';
import { HttpException } from '@nyks-workspace/utils';

export const requestRouter = express.Router();

const parseListQuery = (query: unknown) => {
  const blocksListQuerySchema = z.object({
    page: z.coerce.number().positive().int().max(100).optional().default(1),
    limit: z.coerce.number().positive().int().max(100).optional().default(10),
  });
  return blocksListQuerySchema.safeParse(query);
};

requestRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const result = parseListQuery(req.query);
    if (result.success === false) {
      return res.status(400).json({ error: 'Invalid query' });
    }
    const { page, limit } = result.data;
    const offset = (page - 1) * limit;

    try {
      const { count, rows } = await Faucet.findAndCountAll({
        order: [['id', 'DESC']],
        offset,
        limit,
      });

      res.status(200).json({
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    } catch (error) {
      console.error(error);
      next(
        new HttpException(
          500,
          'Some error occurred while retrieving list of requests.'
        )
      );
    }
  }
);

function parseAddressParams(params: unknown) {
  const addrRegex = /^[a-z]+1[a-z\d]{38}$/;
  const blocksAtHeightParamsSchema = z.object({
    address: z.string().regex(addrRegex),
  });
  return blocksAtHeightParamsSchema.safeParse(params);
}

requestRouter.get(
  '/:address',
  async (req: Request, res: Response, next: NextFunction) => {
    const addressResult = parseAddressParams(req.params);
    if (addressResult.success === false) {
      return res.status(400).json({ error: 'Invalid address' });
    }
    const { address } = addressResult.data;

    const queryResult = parseListQuery(req.query);
    if (queryResult.success === false) {
      return res.status(400).json({ error: 'Invalid query' });
    }
    const { page, limit } = queryResult.data;
    const offset = (page - 1) * limit;

    try {
      const { count, rows } = await Faucet.findAndCountAll({
        where: { address: address },
        order: [['id', 'DESC']],
        offset,
        limit,
      });

      res.status(200).json({
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        data: rows,
      });
    } catch (error) {
      console.error(error);
      next(
        new HttpException(
          500,
          'Some error occurred while retrieving list of requests.'
        )
      );
    }
  }
);
