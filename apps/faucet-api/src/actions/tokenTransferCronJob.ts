import { CronJob } from 'cron';
import { getAllPendingRequests } from '../models';
import { faucetWalletDetails, transferMultiple } from './faucet';
import { env } from '../env';

const { TRANSFER_AMOUNT } = env;

export const tokenTransferCronJob = new CronJob('*/5 * * * * *', tokenTransfer);

let isFetching = false;
async function tokenTransfer() {
  try {
    if (isFetching) {
      console.info('Promise is already pending...');
      return;
    }
    isFetching = true;
    const { faucetAddress, faucetBalance } = await faucetWalletDetails();

    if (Number(faucetBalance.amount) < TRANSFER_AMOUNT) {
      console.log(
        `Insufficient balance. Available tokens are: ${faucetBalance.amount}`
      );
      isFetching = false;
      return;
    }
    const listOfPendingTx = await getAllPendingRequests();
    const listOfAddresses = listOfPendingTx.map(
      (item) => item.toJSON().address as string
    );
    if (listOfAddresses.length === 0) {
      isFetching = false;
      console.log('No addresses to transfer');
      return;
    }
    const result = await transferMultiple(
      faucetAddress,
      listOfAddresses,
      TRANSFER_AMOUNT
    );
    const updatedUserList = listOfPendingTx.map((item) =>
      item.update({
        transactionHash: result.transactionHash,
        status: 'fulfilled',
      })
    );
    await Promise.all(updatedUserList);
    console.log(`Transaction hash: ${result.transactionHash}`);
    isFetching = false;
  } catch (error) {
    isFetching = false;
    console.log(error);
  }
}
