import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#08081C',
      paper: '#10101E',
    },
    text: {
      primary: '#E3EDF9',
    },
    primary: {
      main: '#E3EDF9',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontFamily: 'Instrument Serif, serif',
    },
    button: {
      fontFamily: 'Roboto Mono, monospace',
    },
  },
});

export default theme;
