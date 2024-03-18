import { createTheme } from '@mui/material/styles';

const MaterialThemes = createTheme({
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 'none!important',
          margin: '0!important',
          padding: '0!important',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: '0 !important',
        },
      },
    },
  },
});

export default MaterialThemes;