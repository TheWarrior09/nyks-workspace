import type { Request, Response } from 'express';
import { faucetWalletDetails } from '../actions';

export async function status(req: Request, res: Response) {
  try {
    const { faucetBalance, faucetAddress } = await faucetWalletDetails();
    res.send({ faucetAddress, faucetBalance });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
    return;
  }
}
