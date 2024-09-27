import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../../users/usersSlice';
import {selectAlbumsCreateError, selectAlbumsCreateLoading} from '../albumsSlice';
import {CreateAlbumMutation} from '../../../types';
import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import SendIcon from '@mui/icons-material/Send';
import {fetchArtistsData} from '../../artists/artistsThunks';
import {createAlbum} from '../albumsThunks';
import {Box, Grid, MenuItem, TextField, Typography} from '@mui/material';
import {selectArtistsData} from '../../artists/artistsSlice';
import FileInput from '../../../UI/FileInput/FileInput';
import {LoadingButton} from '@mui/lab';

const AlbumForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectAlbumsCreateError);
  const loading = useAppSelector(selectAlbumsCreateLoading);
  const artistsData = useAppSelector(selectArtistsData);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        await dispatch(fetchArtistsData()).unwrap();
      } catch (error) {
        toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
        console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
      }
    };

    void fetchArtists();
  }, [dispatch]);

  const [resetFileName, setResetFileName] = useState(false);
  const [state, setState] = useState<CreateAlbumMutation>({
    artist: '',
    title: '',
    dataRelease: '',
    image: null,
  });

  const handleResetFileName = (status: boolean) => {
    setResetFileName(status);
  };

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
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
        if (state.artist.trim().length !== 0 && state.title.trim().length !== 0 && state.dataRelease.trim().length !== 0) {
          await dispatch(createAlbum(state)).unwrap();
          setResetFileName(true);
          setState({
            artist: '',
            title: '',
            dataRelease: '',
            image: null,
          });
          navigate(`/albums/${state.artist}`);
        }
      }
    } catch (error) {
      console.error('Произошла ошибка при попытке создания записи. Пожалуйста, попробуйте позже. ' + error);
    }
  };

  return (
    <>
      <Box component="form" onSubmit={submitFormHandler}>
        <Typography variant={'h4'} sx={{mb: 2, color: '#fff'}}>Добавить новый альбом</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              select
              fullWidth
              required
              id="artist"
              label="Выберите артиста"
              value={state.artist}
              name="artist"
              error={Boolean(getFieldError('artist'))}
              helperText={getFieldError('artist')}
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
              }}
              InputLabelProps={{
                sx: {
                  color: '#fff',
                  '&.Mui-focused': {
                    color: '#fff',
                  },
                },
              }}>
              <MenuItem value="" disabled>
                Пожалуйста выберите артиста
              </MenuItem>
              {artistsData.map((artist) => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Название"
              id="title"
              name="title"
              required
              value={state.title}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
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
              label="Дата релиза"
              id="dataRelease"
              type="number"
              required
              inputProps={{ min: 0 }}
              name="dataRelease"
              value={state.dataRelease}
              error={Boolean(getFieldError('dataRelease'))}
              helperText={getFieldError('dataRelease')}
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
          disabled={
            state.artist.trim().length === 0 ||
            state.title.trim().length === 0 ||
            state.dataRelease.trim().length === 0
          }
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

export default AlbumForm;