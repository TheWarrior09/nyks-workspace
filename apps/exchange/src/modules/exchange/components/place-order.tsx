import { useState } from 'react';
import Section from './section';
import TabBar from './tab-bar';
import NumberInput from './number-input';
import LeverageSlider from './leverage-slider';
import colors from '../../../../colors';
import { useMutation } from '@tanstack/react-query';
import {
  createTraderOrder,
  submitJsonRequest,
} from '../../wallet/zkos/tradeOrder';
import { useGlobalContext } from '../../../context';
import {} from '../../wallet/zkos/';
import {
  getFundingAccountString,
  getTradingAccountDetails,
} from '../../wallet/zkos/tradingAccount';

type OrderType = 'MARKET' | 'LIMIT';
type PositionType = 'LONG' | 'SHORT';

async function submitTraderOrder({
  accountId,
  amount,
  leverage,
  orderType,
  positionType,
  price,
  signature,
  tradingAccount,
}: {
  accountId: string;
  orderType: OrderType;
  positionType: PositionType;
  signature: string;
  amount: number;
  leverage: number;
  tradingAccount: string;
  price: number;
}) {
  const order = await createTraderOrder({
    amount,
    leverage,
    signature,
    tradingAccount,
    price,
    accountId,
    orderStatus: 'PENDING',
    orderType,
    positionType,
  });

  const traderOrderResponse = await submitJsonRequest({
    endpoint: 'order',
    id: accountId,
    method: 'CreateTraderOrder',
    orderData: order,
  });
  return traderOrderResponse;
}

const useSubmitTraderOrder = () =>
  useMutation({
    mutationFn: submitTraderOrder,
  });

export default function PlaceOrder() {
  const { amount, encryptScalar, qqAccount, signature, hexAddress } =
    useGlobalContext();

  const [orderType, setOrderType] = useState<OrderType>('LIMIT');

  const [quantity, setQuantity] = useState(amount ?? '0');
  const [limitPrice, setLimitPrice] = useState('0');
  const [desiredLeverage, setDesiredLeverage] = useState(1);
  const [balance, setBalance] = useState(0);

  const [lockedInOrders, setLockedInOrders] = useState(0);
  const [margin, setMargin] = useState(0);

  const submitTraderOrderMutation = useSubmitTraderOrder();

  async function submitTrade(positionType: PositionType) {
    //     console.log(
    //       `{
    //       orderType,
    //       position,
    //       desiredLeverage,
    //       margin: quantity,
    //       limitPrice,
    // }`,
    //       {
    //         orderType,
    //         position: positionType,
    //         leverage: desiredLeverage,
    //         initialMargin: Number(quantity),
    //         entryPrice: Number(limitPrice),
    //       }
    //     );

    if (!signature) throw new Error('signature not found');
    if (!hexAddress) throw new Error('hexAddress not found');
    if (!amount) throw new Error('amount not found');
    if (!qqAccount) throw new Error('qqAccount not found');
    if (!encryptScalar) throw new Error('encryptScalar not found');

    // console.log(
    //   'amount, encryptScalar, qqAccount, signature, hexAddress',
    //   amount,
    //   encryptScalar,
    //   qqAccount,
    //   signature,
    //   hexAddress
    // );

    // const tradingAccount = JSON.stringify({
    //   zkos_account_hex: qqAccount,
    //   encrypt_scalar_hex: encryptScalar,
    // });

    const tradingAccount = getFundingAccountString({
      encryptScalarHex: encryptScalar,
      tradingAccountHex: qqAccount,
    });

    // const order = await createTraderOrder({
    //   amount: Number(amount),
    //   leverage: desiredLeverage,
    //   signature,
    //   tradingAccount,
    //   price: Number(limitPrice),
    //   accountId: hexAddress,
    //   orderStatus: 'PENDING',
    //   orderType: 'LIMIT',
    //   positionType,
    // });

    await submitTraderOrderMutation.mutateAsync(
      {
        accountId: hexAddress,
        amount: Number(amount),
        leverage: desiredLeverage,
        orderType,
        positionType,
        price: Number(limitPrice),
        signature,
        tradingAccount,
      },
      {
        onSuccess: () => {
          console.info('Successful request');
          setQuantity('0');
          setLimitPrice('0');
          setDesiredLeverage(1);
        },
      }
    );
  }

  const marginBalance = lockedInOrders + margin ?? 0;

  const handleLeverageChange = (value: number) => setDesiredLeverage(value);

  console.log('submitTraderOrderMutation data', submitTraderOrderMutation.data);

  return (
    <Section title="Place Order">
      <TabBar
        choices={[
          { id: 'LIMIT', label: 'Limit' },
          { id: 'MARKET', label: 'Market' },
        ]}
        initial={orderType}
        onChange={setOrderType}
        maxWidth="124"
      />

      <NumberInput
        label="Quantity"
        denom="BTC"
        value={String(quantity)}
        onChange={(value) => setQuantity(value)}
      />
      {orderType === 'LIMIT' ? (
        <NumberInput
          label="Limit Price"
          denom="USD"
          value={limitPrice}
          onChange={(value) => setLimitPrice(value)}
        />
      ) : null}

      <LeverageSlider value={desiredLeverage} onChange={handleLeverageChange} />

      <div className="balance available">
        <label>Available Balance</label>
        <span>
          {/* {account ? account.balance.toFixed(8) : 0} <small>BTC</small> */}
          {balance.toFixed(8) ?? 0} <small>BTC</small>
        </span>
      </div>

      <div className="balance margin">
        <label>Margin Balance</label>
        <span>
          {marginBalance.toFixed(8)} <small>BTC</small>
        </span>
      </div>

      <br />

      <div className="buttons">
        <button
          className="buy"
          onClick={() => submitTrade('LONG')}
          disabled={submitTraderOrderMutation.status === 'loading'}
        >
          <label>Buy / Long</label>
          <span>
            ? <small>BTC</small>
          </span>
        </button>
        <button
          className="sell"
          onClick={() => submitTrade('SHORT')}
          disabled={submitTraderOrderMutation.status === 'loading'}
        >
          <label>Sell / Short</label>
          <span>
            ? <small>BTC</small>
          </span>
        </button>
      </div>

      <style jsx>{`
        .balance label {
          display: inline-block;
          font-size: 10px;
          font-weight: bold;
          color: ${colors.label};
          text-transform: uppercase;
          padding-right: 16px;
          width: 50%;
          text-align: right;
        }
        .balance span {
          font-size: 12px;
        }
        .balance small {
          color: ${colors.label};
        }

        .buttons {
          display: flex;
        }

        button {
          flex: 1;
          font-family: inherit;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          width: 110px;
          height: 58px;
          text-align: center;
          margin: 0 4px;
          cursor: pointer;
          outline: none;
          position: relative;
          box-sizing: border-box;
        }
        button:after {
          display: block;
          content: '';
          position: absolute;
          pointer-events: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        button:hover:after {
          background: rgba(0, 0, 0, 0.2);
        }
        button:active:after {
          background: rgba(255, 255, 255, 0.2);
        }
        button label {
          display: block;
          color: white;
          font-weight: bold;
          cursor: pointer;
          z-index: 10;
          position: relative;
        }
        button span {
          color: rgba(255, 255, 255, 0.8);
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          z-index: 10;
          position: relative;

          display: none;
        }
        button.buy {
          background-color: ${colors.green};
          border: 1px solid ${colors.greenHighlight};
        }
        button.sell {
          background-color: ${colors.red};
          border: 1px solid ${colors.redHighlight};
        }
      `}</style>
    </Section>
  );
}
