import type { Request, Response } from 'express';
import { z } from 'zod';
import { credit, faucetWalletDetails, isValidAddress } from '../actions';

const addressRegex = /^[a-z]+1[a-z\d]{38}$/;

const creditSchema = z.object({
  address: z.string().regex(addressRegex),
});

const addressCounter = new Map<string, Date>();

export async function creditBalance(req: Request, res: Response) {
  try {
    const result = creditSchema.safeParse(req.body);
    if (result.success === false) {
      res
        .status(400)
        .send({ message: "Property 'address' must be a valid string." });
      return;
    }

    const { address: recipientAddress } = result.data;
    if (!isValidAddress(recipientAddress)) {
      res.status(400).send({
        message: 'Address is not in the expected format for this chain.',
      });
      return;
    }

    const addressStatus = addressCounter.get(recipientAddress);
    if (addressStatus) {
      const now = new Date();
      const diff = now.getTime() - addressStatus.getTime();
      const waitTimeInMs = 1000 * 60 * 30;
      if (diff < waitTimeInMs) {
        const differenceInMillisecond =
          addressStatus.getTime() - now.getTime() + waitTimeInMs;
        res.status(429).send({
          message: `Too many request for the same address. Blocked to prevent draining. Please wait ${Math.floor(
            differenceInMillisecond / 1000 / 60
          )} minutes ${Math.floor(
            (differenceInMillisecond / 1000) % 60
          )} seconds and try it again!`,
        });
        return;
      }
    }

    const { faucetBalance, faucetAddress } = await faucetWalletDetails();
    if (Number(faucetBalance.amount) < 1000) {
      res.status(422).send({
        message: `Insufficient balance. Available tokens are: ${faucetBalance.amount}`,
      });
      return;
    }

    const txResponse = await credit(faucetAddress, recipientAddress, 3000);
    addressCounter.set(recipientAddress, new Date());

    res.send({
      message: 'Transaction Done',
      transactionHash: txResponse.transactionHash,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
    return;
  }
}
