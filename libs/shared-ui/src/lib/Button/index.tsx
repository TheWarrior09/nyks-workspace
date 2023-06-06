import { Button } from '@mui/material';

interface StyledButtonProps {
  handleConnectWallet: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  href?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<unknown>;
  tabIndex?: number;
  loading?: boolean;
  loadingPosition?: 'start' | 'end';
  loadingIndicator?: React.ReactNode;
  disableElevation?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  handleConnectWallet,
  children,
  ...rest
}) => {
  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: 5, textTransform: 'none' }}
      onClick={handleConnectWallet}
      //   sx={{ ml: 2 }}
    >
      {children}
    </Button>
  );
};

export default StyledButton;
