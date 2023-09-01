import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ChangeEvent, useState } from 'react';
import { darkTransaction } from '../zkos/darkTransaction';
import { useGlobalContext } from '../../../context';
import {
  generatePublicKey,
  generateRandomReceiverAddress,
} from '../zkos/accountManagement';

interface TradingToDarkTxModal {
  open: boolean;
  onClose: () => void;
  fromAccount: string;
  totalAmount: number;
}

function TradingToDarkTxModal({
  onClose,
  open,
  fromAccount,
  totalAmount,
}: TradingToDarkTxModal) {
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  const { signature } = useGlobalContext();

  if (!signature) throw new Error('signature not found');

  const handleToAccountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setToAccount(event.target.value);
  };

  const handleTransferAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleOwnAccount = async () => {
    const publicKey = await generatePublicKey({ signature });
    const receiverAddress = await generateRandomReceiverAddress({ publicKey });

    console.log('receiverAddress', receiverAddress);

    setToAccount(receiverAddress);
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
        <TextField
          variant="outlined"
          autoFocus
          margin="dense"
          id="name"
          label="From"
          type="text"
          value={fromAccount}
          fullWidth
          autoComplete="off"
        />

        <TextField
          variant="outlined"
          autoFocus
          margin="dense"
          id="name"
          label="To"
          type="text"
          value={toAccount}
          onChange={handleToAccountChange}
          fullWidth
          autoComplete="off"
        />

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
              Own account
            </Button>
          </Box>
        </Box>

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
          onClick={async () => {
            try {
              await darkTransaction({
                signature,
                zkosAccountHex: fromAccount,
                amountAvailable: totalAmount,
                amountSend: Number(amount),
                toAccount,
              });
            } catch (error) {
              console.error('error', error);
            }
          }}
          fullWidth
          variant="contained"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TradingToDarkTxModal;
