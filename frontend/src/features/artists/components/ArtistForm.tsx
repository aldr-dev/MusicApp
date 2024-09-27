import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import React, {useState} from 'react';
import {selectUser} from '../../users/usersSlice';
import {CreateArtistMutation} from '../../../types';
import {selectArtistCreateError, selectArtistCreateLoading} from '../artistsSlice';
import {createArtist} from '../artistsThunks';
import SendIcon from '@mui/icons-material/Send';
import {Box, Grid, TextField, Typography} from '@mui/material';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';

const ArtistForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectArtistCreateError);
  const loading = useAppSelector(selectArtistCreateLoading);

  const [resetFileName, setResetFileName] = useState(false);
  const [state, setState] = useState<CreateArtistMutation>({
    name: '',
    information: '',
    image: null,
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (user) {
        if (state.name.trim().length !== 0) {
          await dispatch(createArtist(state)).unwrap();
          setResetFileName(true);
          setState({
            name: '',
            information: '',
            image: null,
          });
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при попытке создания записи. Пожалуйста, попробуйте позже. ' + error);
    }
  };


  return (
    <>
      <Box component="form" onSubmit={submitFormHandler}>
        <Typography variant={'h4'} sx={{mb: 2, color: '#fff'}}>Добавить нового исполнителя</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Имя"
              id="name"
              name="name"
              required
              value={state.name}
              error={Boolean(getFieldError('name'))}
              helperText={getFieldError('name')}
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
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Информация"
              id="information"
              name="information"
              value={state.information}
              multiline
              rows={4}
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
                '& textarea': {
                  color: '#fff',
                },
                '&.Mui-error': {
                  '& textarea': {
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
            <FileInput
              onChange={onChangeFileInput}
              label="Изображение"
              name="image"
              resetFileName={resetFileName}
              handleResetFileName={handleResetFileName}/>
          </Grid>
        </Grid>
        <LoadingButton
          sx={{
            mt: 2,
            color: '#fff',
            background: '#1CD760',
            '&:hover': {
              background: '#14af4d',
            }
          }}
          color="primary"
          type="submit"
          disabled={state.name.trim().length === 0}
          loading={loading}
          loadingPosition="start"
          startIcon={<SendIcon/>}
          variant="contained">
          <span>Отправить</span>
        </LoadingButton>
      </Box>
    </>
  );
};

export default ArtistForm;