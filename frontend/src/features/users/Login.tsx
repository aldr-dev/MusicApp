import React, {useState} from 'react';
import {Avatar, Box, Grid, TextField, Typography, Link, Alert} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {selectLoginError, selectLoginLoading} from './usersSlice';
import {LoginMutation} from '../../types';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {login} from './usersThunks';
import {LoadingButton} from '@mui/lab';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginLoader = useAppSelector(selectLoginLoading);
  const error = useAppSelector(selectLoginError);

  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (state.username.trim().length !== 0 && state.password.trim().length !== 0) {
        await dispatch(login(state)).unwrap();
        navigate('/');
      }
    } catch (error) {
      console.error('Произошла ошибка при попытке авторизации. Пожалуйста, попробуйте позже. ' + error);
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#2D2D2D',
        padding: '32px',
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.2)',
        maxWidth: '400px',
        margin: 'auto',
      }}>
      <Avatar sx={{m: 1, bgcolor: '#1CD760', width: 56, height: 56}}>
        <LockOpenIcon fontSize="large"/>
      </Avatar>
      <Typography component="h1" color="#ffffff" variant="h5" sx={{mb: 3}}>
        Авторизация
      </Typography>
      <Box component="form" onSubmit={submitFormHandler} sx={{width: '100%'}}>
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              required
              fullWidth
              variant="outlined"
              label="Имя пользователя"
              name="username"
              autoComplete="current-username"
              value={state.username}
              onChange={inputChangeHandler}
              sx={{
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
                },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px #3A3A3A inset',
                  WebkitTextFillColor: '#fff !important',
                },
                '& input': {
                  color: '#fff',
                },
                '&.Mui-error': {
                  '& input': {
                    backgroundColor: '#3A3A3A',
                  },
                }
              }}
              InputLabelProps={{
                sx: {
                  color: '#fff',
                  '&.Mui-focused': {
                    color: '#fff',
                  },
                },
              }}/>
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              variant="outlined"
              type="password"
              label="Пароль"
              name="password"
              autoComplete="current-password"
              value={state.password}
              onChange={inputChangeHandler}
              sx={{
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
                },
                '& input': {
                  color: '#fff',
                },
                '& input:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 1000px #3A3A3A inset',
                  WebkitTextFillColor: '#fff !important',
                },
                '&.Mui-error': {
                  '& input': {
                    backgroundColor: '#3A3A3A',
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: '#fff',
                  '&.Mui-focused': {
                    color: '#fff',
                  },
                },
              }}
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          disabled={state.username.trim().length === 0 || state.password.trim().length === 0}
          loading={loginLoader}
          variant="contained"
          sx={{
            mt: 4,
            width: '100%',
            backgroundColor: '#1CD760',
            '&:hover': {
              backgroundColor: '#14A94B',
            },
            '&.Mui-disabled': {
              background: '#b2b2b2',
              color: '#757575',
            },
            color: '#fff',
            borderRadius: '8px',
            fontWeight: 'bold',
            padding: '12px 0',
            '& .MuiLoadingButton-loadingIndicator': {
              color: '#fff',
            },
          }}>
          <span>Войти</span>
        </LoadingButton>
        <Link
          component={RouterLink}
          to="/register"
          variant="body2"
          sx={{
            display: 'inline-block',
            width: '100%',
            mt: 2,
            color: '#1CD760',
            textAlign: 'center',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}>
          Нет аккаунта? Зарегистрироваться
        </Link>
      </Box>
      {error && (
        <Alert severity="error" sx={{mt: 3, width: '100%'}}>
          {error.error}
        </Alert>
      )}
    </Box>
  );
};

export default Login;