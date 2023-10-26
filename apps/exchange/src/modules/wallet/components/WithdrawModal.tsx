import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

export function WithdrawModal({
  onClose,
  open,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [fundingWithdrawCoin, setFundingWithdrawCoin] = useState('btc');
  const [fundingWithdrawChainType, setFundingWithdrawChainType] =
    useState('btc');

  const handleChangeFundingWithdrawChainType = (event: SelectChangeEvent) => {
    setFundingWithdrawChainType(event.target.value as string);
  };

  const handleChangeFundingWithdrawCoin = (event: SelectChangeEvent) => {
    setFundingWithdrawCoin(event.target.value as string);
  };
  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Withdraw{' '}
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
            On-chain Withdrawal
            <Grid container>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ mt: 2, mb: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Coin</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={fundingWithdrawCoin}
                    label="From"
                    onChange={handleChangeFundingWithdrawCoin}
                  >
                    <MenuItem value={'btc'}>BTC Bitcoin</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Wallet Address"
                  type="email"
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContentText>
          <FormControl fullWidth sx={{ my: 2, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Chain type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fundingWithdrawChainType}
              label="Chain Type"
              onChange={handleChangeFundingWithdrawChainType}
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
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions disableSpacing={true}>
          <Grid container sx={{ px: 3, pb: 1 }}>
            <Grid item xs={6}>
              <Typography variant="caption">Transaction Fee:</Typography>
              <Typography variant="body2">0.0005 BTC</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button onClick={onClose} fullWidth variant="contained">
                Confirm
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
