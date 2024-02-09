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
import { useTwilightRpcWithCosmjs } from '@nyks-workspace/hooks';
import Long from 'long';
import { truncate } from './TradingAccount/TradingAccountList';
import {
  useBroadcastBurnTransaction,
  useBroadcastDarkTransaction,
  useBroadcastQuisquisTransaction,
} from '../hooks/useBroadcastTransaction';
import { useQueryGetTradingAccounts } from '../hooks/useQueryZkos';
import { delay } from '../../../utils';
import { useSnackbarUpdateContext } from '../../../context/snackbarContext';
import {
  generateNewFundingAccount,
  generateRandomTradingAddress,
} from '../utils';
import type { TradingAccountData } from '../utils';

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

  const tradingAccountsQuery = useQueryGetTradingAccounts(twilightAddress);

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
    const receiverAddress = await generateRandomTradingAddress();

    setReceiverAddress(receiverAddress);
  };

  const handleTradingToDarkTxSubmit = async () => {
    const senderBalance = tradingAccountData.find(
      (item) => item.tradingAddress === senderAddress
    )?.value;

    if (typeof senderBalance === 'undefined' || typeof amount === 'undefined')
      return;

    const darkTransactionResponse =
      await broadcastDarkTransactionSingle.mutateAsync({
        fromAddress: senderAddress,
        toAddress: receiverAddress,
        toAddressType: toAddressType,
        amountAvailable: Number(senderBalance),
        amountSend: Number(amount),
      });

    console.log('darkTransactionResponse', darkTransactionResponse);

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

    const receiverAddress = await generateRandomTradingAddress();

    console.log('receiverAddress', receiverAddress);

    // const broadcastBurnTransactionResponse =
    //   await broadcastBurnTransaction.mutateAsync({
    //     twilightAddress,
    //     fromAddress: senderAddress,
    //     toAddress: receiverAddress,
    //     burnAmount: Number(senderBalance),
    //   });

    // await mintBurnTradingBtc.mutateAsync(
    //   {
    //     btcValue: Long.fromNumber(Number(senderBalance)),
    //     qqAccount: broadcastBurnTransactionResponse.tradingAccountHex,
    //     encryptScalar: broadcastBurnTransactionResponse.encryptScalarHex,
    //     mintOrBurn: false,
    //     twilightAddress: twilightAddress,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       console.log('onSuccess', data);
    //     },
    //   }
    // );

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

    const chainTradingAccount = await generateNewFundingAccount(amount);

    const mintSatsTxResponse = await mintBurnTradingBtc.mutateAsync(
      {
        btcValue: Long.fromNumber(amount),
        qqAccount: chainTradingAccount.zkAccount,
        encryptScalar: chainTradingAccount.rScalar,
        mintOrBurn: true,
        twilightAddress: twilightAddress ?? '',
      },
      {
        onSuccess: (data) => {
          if (data.code === 0) {
            console.log('onSuccess', data);
          }
        },
      }
    );

    console.log('mintSatsTxResponse', mintSatsTxResponse);

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
        <DialogContentText component="div">
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
                  <MenuItem value={'funding'}>Funding</MenuItem>
                  <MenuItem value={'trading'}>Trading</MenuItem>
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
                  <MenuItem value={'funding'}>Funding</MenuItem>
                  <MenuItem value={'trading'}>Trading</MenuItem>
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
      </DialogActions>
    </Dialog>
  );
}

export default TransferModal;
