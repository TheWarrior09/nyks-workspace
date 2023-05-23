import type { Request, Response } from 'express';
import { z } from 'zod';
import { isValidAddress } from '../actions';
import {
  getLatestPendingRequest,
  saveIndividualUserRequest,
  getLatestRequest,
} from '../models';

const addressRegex = /^[a-z]+1[a-z\d]{38}$/;

const creditSchema = z.object({
  address: z.string().regex(addressRegex),
});

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

    const userPreviousRequest = await getLatestPendingRequest(recipientAddress);
    if (userPreviousRequest) {
      const dbResponse = await userPreviousRequest.toJSON();
      const transactionStatus = dbResponse.status;
      if (transactionStatus === 'pending') {
        res.status(422).send({
          message: `Previous request is still pending. Please wait till it is completed.`,
        });
        return;
      }
    }

    const userLatestRequest = await getLatestRequest(recipientAddress);
    if (userLatestRequest) {
      const dbResponse = await userLatestRequest.toJSON();
      const transactionStatus = dbResponse.status;
      const currentTime = new Date().getTime();
      const requestFulfilledAt = new Date(dbResponse.updatedAt).getTime();
      const waitTimeInMs = 1000 * 60 * 30;
      const timeDifferenceBtwTwoRequests = currentTime - requestFulfilledAt;
      if (
        transactionStatus === 'fulfilled' &&
        timeDifferenceBtwTwoRequests < waitTimeInMs
      ) {
        const differenceInMillisecond =
          requestFulfilledAt - currentTime + waitTimeInMs;
        const waitTimeInMinutes = Math.floor(
          differenceInMillisecond / 1000 / 60
        );
        const waitTimeInSeconds = Math.floor(
          (differenceInMillisecond / 1000) % 60
        );
        res.status(429).send({
          message: `Too many request for the same address. Blocked to prevent draining. Please wait ${waitTimeInMinutes} minutes ${waitTimeInSeconds} seconds and try it again!`,
        });
        return;
      }
    }

    await saveIndividualUserRequest(recipientAddress);

    res.send({
      message: `Added ${recipientAddress} to the credit list. Please wait for the transaction to be completed.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'Internal Server Error' });
    return;
  }
}
