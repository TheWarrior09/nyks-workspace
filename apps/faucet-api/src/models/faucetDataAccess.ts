import { Op } from 'sequelize';
import { Faucet } from './faucet';

async function saveIndividualUserRequest(address: string) {
  try {
    await Faucet.create({
      address: address,
    });
    console.debug(
      `Request for balance of address: ${address} saved successfully!`,
      {
        service: 'Database CRUD',
      }
    );
  } catch (error) {
    console.error('Failed to save address in database.', error, {
      service: 'Database CRUD',
    });
    throw error;
  }
}

async function updateIndividualUserTransactionDetails(
  address: string,
  txHash: string,
  txStatus: string
) {
  try {
    await Faucet.update(
      {
        transactionHash: txHash,
        status: txStatus,
      },
      {
        where: {
          address,
        },
      }
    );
  } catch (error) {
    console.error('Failed to update address in database.', error, {
      service: 'Database CRUD',
    });
    throw error;
  }
}

async function getLatestPendingRequest(address: string) {
  try {
    const result = await Faucet.findOne({
      where: {
        address,
        transactionHash: {
          [Op.eq]: null,
        },
      },
    });
    return result;
  } catch (error) {
    console.error('Failed to get address from database.', error, {
      service: 'Database CRUD',
    });
    throw error;
  }
}

async function getLatestRequest(address: string) {
  try {
    const result = await Faucet.findOne({
      where: {
        address,
        transactionHash: {
          [Op.ne]: null,
        },
      },
      order: [['createdAt', 'DESC']],
    });
    return result;
  } catch (error) {
    console.error('Failed to get address from database.', error, {
      service: 'Database CRUD',
    });
    throw error;
  }
}

async function getAllPendingRequests() {
  try {
    const result = await Faucet.findAll({
      where: {
        status: 'pending',
      },
    });
    return result;
  } catch (error) {
    console.error(
      'Failed to get list of pending addresses from database.',
      error,
      {
        service: 'Database CRUD',
      }
    );
    throw error;
  }
}

export {
  saveIndividualUserRequest,
  updateIndividualUserTransactionDetails,
  getLatestPendingRequest,
  getLatestRequest,
  getAllPendingRequests,
};
