import {createTheme} from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#212121',
    },
    text: {
      primary: '#fff'
    }
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
});

export default theme;