import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import { invalidPathHandler } from './middleware';
import { creditRouter, statusRouter } from './routes';
import { sequelize } from './database';

const host = process.env.HOST ?? 'localhost';
const port = process.env.FAUCET_API_PORT
  ? Number(process.env.FAUCET_API_PORT)
  : 9000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

(async function () {
  try {
    await sequelize.authenticate();
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

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
