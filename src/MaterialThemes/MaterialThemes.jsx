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
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#ebebeb', 
          '&:before': {
            borderBottomColor: '#ebebeb',
          },
          '&:hover:before': {
            borderBottomColor: '#ebebeb!important',
          },
          
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#ebebeb',
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '2em',
          width: '90%',
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: '#ebebeb'
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#ebebeb!important'
        }
      }
    },
    ArrowBackIosNewIcon: {
      styleOverrides: {
        root: {
          '&:hover':{
            color:'#842497'
          }
        }
      }
    },
  },
});

export default MaterialThemes;