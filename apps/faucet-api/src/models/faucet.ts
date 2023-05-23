import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export const Faucet = sequelize.define('faucet', {
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transactionHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['pending', 'fulfilled', 'rejected'],
    allowNull: false,
    defaultValue: 'pending',
  },
});
