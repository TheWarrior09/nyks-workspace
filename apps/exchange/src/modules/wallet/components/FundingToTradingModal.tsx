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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useState } from 'react';
import { useBroadcastMintTransaction } from '../hooks/useBroadcastTransaction';
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
}

function FundingToTradingModal({ onClose, open }: FundingToTradingModal) {
  const [fundingTransferFrom, setFundingTransferFrom] = useState('funding');
  const [fundingTransferTo, setFundingTransferTo] = useState('trading');
  const [fundingWithdrawCoin, setFundingWithdrawCoin] = useState('btc');
  const [amount, setAmount] = useState('');

  const { handleMintTradingBtc, status } = useBroadcastMintTransaction({
    amount: Number(amount),
  });

  const handleChangeFundingTransferFrom = (event: SelectChangeEvent) => {
    setFundingTransferFrom(event.target.value);
  };

  const handleChangeFundingTransferTo = (event: SelectChangeEvent) => {
    setFundingTransferTo(event.target.value);
  };

  const handleChangeFundingWithdrawCoin = (event: SelectChangeEvent) => {
    setFundingWithdrawCoin(event.target.value);
  };

  const handleTransferAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
    await handleMintTradingBtc();
    onClose();
  };

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
                  value={fundingTransferFrom}
                  // value={'trading'}
                  label="From"
                  onChange={handleChangeFundingTransferFrom}
                >
                  {/* <MenuItem value={'trading'}>Trading</MenuItem> */}
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
                  value={fundingTransferTo}
                  // value={'funding'}
                  label="To"
                  onChange={handleChangeFundingTransferTo}
                >
                  <MenuItem value={'trading'}>Trading</MenuItem>
                  {/* <MenuItem value={'funding'}>Funding</MenuItem> */}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContentText>
        <FormControl fullWidth sx={{ my: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Coin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fundingWithdrawCoin}
            label="Coin"
            onChange={handleChangeFundingWithdrawCoin}
          >
            <MenuItem value={'btc'}>BTC</MenuItem>
          </Select>
        </FormControl>

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
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />
      </DialogContent>
      <DialogActions disableSpacing={true} sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={handleSubmit}
          disabled={!amount || status === 'loading'}
          fullWidth
          variant="contained"
        >
          {status === 'loading' ? 'Broadcasting tx' : 'Confirm'}
        </Button>

        {/* <Button onClick={handleTrade} fullWidth variant="contained">
          Trade
        </Button> */}
      </DialogActions>
    </Dialog>
  );
}

export default FundingToTradingModal;

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
