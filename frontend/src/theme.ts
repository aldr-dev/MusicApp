import {createTheme} from '@mui/material';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'linear-gradient(-180deg, rgba(50, 50, 50, .9), rgba(0, 0, 0, 0.9))',
          minHeight: '100vh',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#3A3A3A',
          borderRadius: '8px',
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#1CD760',
            },
            '&:hover fieldset': {
              borderColor: '#14af4d',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1CD760',
            },
            '& input': {
              color: '#fff',
            },
            '&.Mui-error fieldset': {
              borderColor: '#f44336',
            },
            '& textarea': {
              color: '#fff',
            },
            '&.Mui-error': {
              '& textarea': {
                backgroundColor: '#3A3A3A',
              },
            },
            '& .MuiSelect-select': {
              color: '#fff',
            },
            '& .MuiSvgIcon-root': {
              color: '#fff',
            },
            '& .Mui-error': {
              '& .MuiSelect-select': {
                backgroundColor: '#3A3A3A',
              },
            },
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 1000px #3A3A3A inset',
              WebkitTextFillColor: '#fff !important',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#fff',
            '&.Mui-focused': {
              color: '#fff',
            },
            '&.Mui-error': {
              color: '#f44336',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: '#3A3A3A',
          borderRadius: '8px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1CD760',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#14af4d',
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f44336',
          },
          '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f44336',
          },
          '&.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#f44336',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1CD760',
          },
          '& .MuiSelect-select': {
            color: '#fff',
          },
        },
      },
    },
  },
});

export default theme;