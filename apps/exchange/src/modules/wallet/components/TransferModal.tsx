import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogContentText,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  DialogActions,
  Button,
  SelectChangeEvent,
  Box,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  AddNewAccountInLocalData,
  getTradingAccountDetails,
} from '../zkos/tradingAccount';
import { useGlobalContext } from '../../../context';
import {
  generateNewFundingAccount,
  generatePublicKey,
  generateRandomTradingAddress,
  getTradingHexAddressFromAccountHex,
} from '../zkos';
import { useTwilightRpcWithCosmjs } from '@nyks-workspace/hooks';
import Long from 'long';
import { truncate } from './TradingAccount/TradingAccountList';
import {
  useBroadcastBurnTransaction,
  useBroadcastDarkTransaction,
  useBroadcastQuisquisTransaction,
} from '../hooks/useBroadcastTransaction';
import {
  TradingAccountData,
  useQueryGetTradingAccounts,
} from '../hooks/useQueryZkos';
import { delay } from '../zkos/transactions/';
import { useSnackbarUpdateContext } from '../../../context/snackbarContext';
// import { createTraderOrder, getZkosAccount } from '../zkos';
// import {
//   createCancelTraderOrder,
//   createExecuteTraderOrder,
//   createQueryTraderOrder,
//   submitCancelTraderOrder,
//   submitExecuteTraderOrder,
//   submitQueryTraderOrder,
//   submitTraderOrder,
// } from '../zkos/tradeOrder';

interface FundingToTradingModal {
  open: boolean;
  onClose: () => void;
  twilightAddress: string;
}

function TransferModal({
  onClose,
  open,
  twilightAddress,
}: FundingToTradingModal) {
  const [transferFrom, setTransferFrom] = useState('funding');
  const [transferTo, setTransferTo] = useState('trading');
  const [amount, setAmount] = useState<number>();

  const [senderAddress, setSenderAddress] = useState<string>('');
  const [receiverAddress, setReceiverAddress] = useState('');

  const [toAddressType, setToAddressType] = useState<'address' | 'output'>(
    'address'
  );

  const { handleSnackbarOpen } = useSnackbarUpdateContext();

  const broadcastDarkTransactionSingle = useBroadcastDarkTransaction();
  const broadcastQuisquisTransactionSingle = useBroadcastQuisquisTransaction();
  const broadcastBurnTransaction = useBroadcastBurnTransaction();

  const { mintBurnTradingBtc } = useTwilightRpcWithCosmjs();
  const { signature } = useGlobalContext();
  if (!signature) throw new Error('signature not found');

  const handleChangeToAddressType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setToAddressType(
      (event.target as HTMLInputElement).value as 'address' | 'output'
    );
  };

  useEffect(() => {
    setReceiverAddress('');
  }, [toAddressType]);

  const tradingAccountsQuery = useQueryGetTradingAccounts(
    signature,
    twilightAddress
  );

  const tradingAccountData = tradingAccountsQuery.data.reduce(
    (accumulator: TradingAccountData[], currentObject) => {
      const isDuplicate = accumulator.some(
        (obj) => obj.tradingAddress === currentObject.tradingAddress
      );
      if (!isDuplicate) {
        if (Number(currentObject.value) > 0) {
          accumulator.push(currentObject);
        }
      }
      return accumulator;
    },
    []
  );

  const handleToAccountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReceiverAddress(event.target.value);
  };

  const handleChangeTypeTransferFrom = (event: SelectChangeEvent) => {
    setTransferFrom(event.target.value);
  };

  const handleChangeTypeTransferTo = (event: SelectChangeEvent) => {
    setTransferTo(event.target.value);
  };

  const handleChangeAddressTransferFrom = (event: SelectChangeEvent) => {
    setSenderAddress(event.target.value);
  };

  const handleTransferAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.valueAsNumber);
  };

  const handleOwnAccount = async () => {
    const publicKey = await generatePublicKey({ signature });
    const receiverAddress = await generateRandomTradingAddress({ publicKey });

    setReceiverAddress(receiverAddress);
  };

  const handleTradingToDarkTxSubmit = async () => {
    const senderBalance = tradingAccountData.find(
      (item) => item.tradingAddress === senderAddress
    )?.value;

    if (typeof senderBalance === 'undefined' || typeof amount === 'undefined')
      return;

    await broadcastDarkTransactionSingle.mutateAsync({
      signature,
      twilightAddress,
      fromAddress: senderAddress,
      toAddress: receiverAddress,
      toAddressType: toAddressType,
      amountAvailable: Number(senderBalance),
      amountSend: Number(amount),
    });

    onClose();
    handleSnackbarOpen({
      open: true,
      message: 'Successfully broadcasted dark transaction',
      duration: 7000,
    });
    await delay(7000);
    await tradingAccountsQuery.refetch();
  };

  const handleTradingToQuisquisTxSubmit = async () => {
    const senderBalance = tradingAccountData.find(
      (item) => item.tradingAddress === senderAddress
    )?.value;

    if (typeof senderBalance === 'undefined' || typeof amount === 'undefined')
      return;

    await broadcastQuisquisTransactionSingle.mutateAsync({
      signature,
      twilightAddress,
      fromAddress: senderAddress,
      toAddress: receiverAddress,
      toAddressType: toAddressType,
      amountAvailable: Number(senderBalance),
      amountSend: Number(amount),
    });

    onClose();
    handleSnackbarOpen({
      open: true,
      message: 'Successfully broadcasted quisquis transaction',
      duration: 7000,
    });
    await delay(7000);
    await tradingAccountsQuery.refetch();
  };

  const handleTradingToFundingTxSubmit = async () => {
    const senderBalance = tradingAccountData.find(
      (item) => item.tradingAddress === senderAddress
    )?.value;

    if (typeof senderBalance === 'undefined') return;

    const publicKey = await generatePublicKey({ signature });
    const receiverAddress = await generateRandomTradingAddress({ publicKey });

    const broadcastBurnTransactionResponse =
      await broadcastBurnTransaction.mutateAsync({
        signature,
        twilightAddress,
        fromAddress: senderAddress,
        toAddress: receiverAddress,
        burnAmount: Number(senderBalance),
      });

    await mintBurnTradingBtc.mutateAsync(
      {
        btcValue: Long.fromNumber(Number(senderBalance)),
        qqAccount: broadcastBurnTransactionResponse.tradingAccountHex,
        encryptScalar: broadcastBurnTransactionResponse.encryptScalarHex,
        mintOrBurn: false,
        twilightAddress: twilightAddress,
      },
      {
        onSuccess: (data) => {
          console.log('onSuccess', data);
        },
      }
    );

    onClose();
    handleSnackbarOpen({
      open: true,
      message: 'Successfully broadcasted trading to funding transaction',
      duration: 7000,
    });
    await delay(7000);
    await tradingAccountsQuery.refetch();
  };

  const handleFundingToTradingSubmit = async () => {
    if (typeof amount === 'undefined') return;
    const publicKey = await generatePublicKey({
      signature,
    });
    const chainTradingAccount = await generateNewFundingAccount(
      publicKey,
      amount
    );

    const { encryptScalarHex, tradingAccountHex } =
      getTradingAccountDetails(chainTradingAccount);

    const hexAddress = await getTradingHexAddressFromAccountHex(
      tradingAccountHex
    );

    await mintBurnTradingBtc.mutateAsync(
      {
        btcValue: Long.fromNumber(amount),
        qqAccount: tradingAccountHex,
        encryptScalar: encryptScalarHex,
        mintOrBurn: true,
        twilightAddress: twilightAddress ?? '',
      },
      {
        onSuccess: (data) => {
          if (data.code === 0) {
            AddNewAccountInLocalData(
              { twilightAddress: twilightAddress ?? '' },
              [
                {
                  tradingAccount: tradingAccountHex,
                  encryptScalar: encryptScalarHex,
                  tradingAddress: hexAddress,
                  btcValue: amount,
                  transactionId: data.transactionHash,
                  transactionType: 'fundingToTrading',
                  height: data.height,
                  status: 'unSpent',
                },
              ]
            );
          }
        },
      }
    );

    onClose();
    handleSnackbarOpen({
      open: true,
      message: 'Successfully funded trading account',
      duration: 7000,
    });
    await delay(7000);
    await tradingAccountsQuery.refetch();
  };

  const renderToAddressType = (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        To Address Type:
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={toAddressType}
        onChange={handleChangeToAddressType}
      >
        <FormControlLabel value="address" control={<Radio />} label="Address" />
        <FormControlLabel value="output" control={<Radio />} label="UTXO ID" />
      </RadioGroup>
    </FormControl>
  );

  const renderTradingToTradingTxInputs = (
    <>
      <FormControl fullWidth sx={{ my: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">From Address</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={senderAddress}
          label="From Address"
          onChange={handleChangeAddressTransferFrom}
        >
          {tradingAccountData.map((account) => (
            <MenuItem
              value={account.tradingAddress}
              key={account.tradingAddress}
            >
              Address: {truncate(account.tradingAddress, 24)} - Balance:
              {Number(account.value)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {renderToAddressType}

      <TextField
        variant="outlined"
        autoFocus
        margin="dense"
        autoComplete="off"
        id="user-address"
        name="user-address"
        label={`${
          toAddressType === 'address' ? 'To Address HEX' : 'Output HEX'
        }`}
        type="text"
        placeholder={`${
          toAddressType === 'address' ? 'Get new address' : 'Paste Output HEX'
        }`}
        inputProps={{
          readOnly: toAddressType === 'address' ? true : false,
        }}
        value={receiverAddress}
        onChange={handleToAccountChange}
        fullWidth
      />

      {toAddressType === 'address' ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
          }}
        >
          <Box sx={{ width: 200, my: 1 }}>
            <Button
              onClick={handleOwnAccount}
              fullWidth
              size="small"
              variant="contained"
            >
              Generate new address
            </Button>
          </Box>
        </Box>
      ) : null}
    </>
  );

  const renderFromAddressField = (
    <FormControl fullWidth sx={{ my: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">From Address</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={senderAddress}
        label="From Address"
        onChange={handleChangeAddressTransferFrom}
      >
        {tradingAccountData.map((account) => (
          <MenuItem value={account.tradingAddress} key={account.tradingAddress}>
            Address: {truncate(account.tradingAddress, 24)} - Balance:
            {Number(account.value)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderTransferAmountField = (
    <TextField
      variant="outlined"
      autoFocus
      margin="dense"
      id="name"
      label="Amount"
      type="number"
      value={amount}
      onChange={handleTransferAmount}
      fullWidth
      autoComplete="off"
      inputProps={{
        inputMode: 'numeric',
        pattern: '[0-9]*',
      }}
    />
  );

  const renderFundingToTradingTxSubmitButton = (
    <Button
      onClick={handleFundingToTradingSubmit}
      disabled={
        typeof amount === 'undefined' || mintBurnTradingBtc.status === 'loading'
      }
      fullWidth
      variant="contained"
    >
      {mintBurnTradingBtc.status === 'loading'
        ? 'Broadcasting tx'
        : 'Funding to Trading'}
    </Button>
  );

  const renderTradingToTradingTxSubmitButton = (
    <Button
      onClick={handleTradingToDarkTxSubmit}
      disabled={
        typeof amount === 'undefined' ||
        broadcastDarkTransactionSingle.status === 'loading' ||
        broadcastQuisquisTransactionSingle.status === 'loading'
      }
      fullWidth
      variant="contained"
    >
      {broadcastDarkTransactionSingle.status === 'loading'
        ? 'Broadcasting tx'
        : 'Dark transaction'}
    </Button>
  );

  const renderTradingToQuisquisTxSubmitButton = (
    <Button
      onClick={handleTradingToQuisquisTxSubmit}
      disabled={
        typeof amount === 'undefined' ||
        broadcastQuisquisTransactionSingle.status === 'loading' ||
        broadcastDarkTransactionSingle.status === 'loading'
      }
      fullWidth
      variant="contained"
      sx={{ ml: 2 }}
    >
      {broadcastQuisquisTransactionSingle.status === 'loading'
        ? 'Broadcasting tx'
        : 'Quisquis transaction'}
    </Button>
  );

  const renderTradingToFundingTxSubmitButton = (
    <Button
      onClick={handleTradingToFundingTxSubmit}
      disabled={
        senderAddress.length === 0 ||
        broadcastBurnTransaction.status === 'loading'
      }
      fullWidth
      variant="contained"
    >
      {broadcastBurnTransaction.status === 'loading'
        ? 'Broadcasting tx'
        : 'Burn transaction'}
    </Button>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth={'sm'}>
      <DialogTitle>
        Transfer
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ my: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">From</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={transferFrom}
                  label="From"
                  onChange={handleChangeTypeTransferFrom}
                >
                  <MenuItem value={'trading'}>Trading</MenuItem>
                  <MenuItem value={'funding'}>Funding</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ my: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">To</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={transferTo}
                  label="To"
                  onChange={handleChangeTypeTransferTo}
                >
                  <MenuItem value={'trading'}>Trading</MenuItem>
                  <MenuItem value={'funding'}>Funding</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {transferFrom === 'funding' && transferTo === 'trading'
            ? renderTransferAmountField
            : null}

          {transferFrom === 'trading' && transferTo === 'trading' ? (
            <>
              {renderTradingToTradingTxInputs}
              {renderTransferAmountField}
            </>
          ) : null}

          {transferFrom === 'trading' && transferTo === 'funding'
            ? renderFromAddressField
            : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions disableSpacing={true} sx={{ px: 3, pb: 3 }}>
        {transferFrom === 'funding' && transferTo === 'trading'
          ? renderFundingToTradingTxSubmitButton
          : null}

        {transferFrom === 'trading' && transferTo === 'trading' ? (
          <>
            {renderTradingToTradingTxSubmitButton}
            {renderTradingToQuisquisTxSubmitButton}
          </>
        ) : null}

        {transferFrom === 'trading' && transferTo === 'funding'
          ? renderTradingToFundingTxSubmitButton
          : null}

        {/* <Button onClick={handleTrade} fullWidth variant="contained">
          Trade
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default TransferModal;

// const handleTrade = async () => {
//   const tradingAccount = JSON.stringify({
//     zkos_account_hex:
//       '0cee81deadabacfe02e2c94c0ee24964e746a4f2ff48cc7b3c27960d86cdea0a46ba5aaeddde64a2ff4d7635e74e665048253290177e137253c9fae392ba000f5e3ce6e7b8a4e43febedf48c29ab6fdf9e5cdcb57d058c87817a7dd5cc6b18ffeccf82886c1298f5aadb9bf288442f68426b6a38100e57d4265cf3ca877c1777fc6ab59008',
//     encrypt_scalar_hex:
//       '8b262a40ced5a23feef4ba4a52c01368aa38c52b5130b818b48a94cce8bd140c',
//   });

//   const signature =
//     'kWz8d7rRaQ1tb90bFnqa+aL932jFPm/dfor2aJm5acF4i1V38zbXE0nTHuQ+zIxjNZB9JAClgoVqoFTOnjftkA==';

//   const ACCOUNT_ID = '1234567';
//   const AMOUNT = 150;
//   const LEVERAGE = 5;
//   const PRICE = 26400;

//   const order = await createTraderOrder({
//     amount: AMOUNT,
//     leverage: LEVERAGE,
//     signature,
//     tradingAccount,
//     price: PRICE,
//     accountId: ACCOUNT_ID,
//     orderStatus: 'PENDING',
//     orderType: 'LIMIT',
//     positionType: 'LONG',
//   });

//   const traderOrderResponse = await submitTraderOrder(order);
//   console.log('submitTraderOrderZkos', traderOrderResponse);

//   const { zkosHexAddress } = await getZkosAccount(tradingAccount);

//   const query = await createQueryTraderOrder({
//     signature,
//     zkosHexAddress,
//     accountId: ACCOUNT_ID,
//     orderStatus: 'PENDING',
//   });

//   const traderQueryResponse = await submitQueryTraderOrder(query);
//   console.log('submitQueryTraderOrder', traderQueryResponse);

//   const uuid = traderQueryResponse.result?.uuid;
//   if (typeof uuid === 'undefined') throw new Error('order not found');

//   console.log('uuid', uuid);
//   const cancel = await createCancelTraderOrder({
//     accountId: ACCOUNT_ID,
//     orderStatus: 'PENDING',
//     orderType: 'LIMIT',
//     signature: signature,
//     UUID: uuid,
//     zkosHexAddress,
//   });
//   console.log('createCancelTraderOrder', cancel);

//   const cancelOrderResponse = await submitCancelTraderOrder(cancel);
//   console.log('submitCancelTraderOrder', cancelOrderResponse);

//   const execute = await createExecuteTraderOrder({
//     accountId: ACCOUNT_ID,
//     amount: AMOUNT,
//     orderStatus: 'PENDING',
//     orderType: 'LIMIT',
//     // price: PRICE,
//     price: 25000,
//     signature,
//     tradingAccount,
//     transactionType: 'ORDERTX',
//     // UUID: uuid,
//     UUID: '073892c8-33e5-4f50-80de-773d54f93968',
//   });
//   console.log('createExecuteTraderOrder', execute);

//   const executeOrderResponse = await submitExecuteTraderOrder(execute);
//   console.log('submitExecuteTraderOrder', executeOrderResponse);
// };
