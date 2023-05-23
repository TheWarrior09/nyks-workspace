import express from 'express';
import helmet from 'helmet';
import { invalidPathHandler } from './middleware';
import { creditRouter, statusRouter } from './routes';
import { sequelize } from './database';
import { Faucet } from './models';
import { tokenTransferCronJob } from './actions/';
import { env } from './env';

const host = env.FAUCET_API_HOST;
const port = env.FAUCET_API_PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

(async function () {
  try {
    await sequelize.authenticate();
    await Faucet.sync();
    console.info('Database connection has been established successfully.', {
      service: 'Faucet-api App',
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error, {
      service: 'Faucet-api App',
    });
  }
})();

app.get('/', (req, res) => {
  res.send({ message: 'Hello Faucet API' });
});

app.use('/credit', creditRouter);
app.use('/status', statusRouter);

app.use(invalidPathHandler);

(() => tokenTransferCronJob.start())();

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
