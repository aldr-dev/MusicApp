import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {useNavigate} from 'react-router-dom';
import {selectUser} from '../../users/usersSlice';
import {selectTracksCreateError, selectTracksCreateLoading} from '../tracksSlice';
import {selectArtistsData} from '../../artists/artistsSlice';
import React, {useEffect, useState} from 'react';
import SendIcon from '@mui/icons-material/Send';
import {fetchArtistsData} from '../../artists/artistsThunks';
import {toast} from 'react-toastify';
import {fetchAlbumsData} from '../../albums/albumsThunks';
import {TrackMutationFrom, TrackMutationObject} from '../../../types';
import {createTrack} from '../tracksThunks';
import {Box, Grid, MenuItem, TextField, Typography} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {selectAlbumsData} from '../../albums/albumsSlice';

const TrackForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const error = useAppSelector(selectTracksCreateError);
  const loading = useAppSelector(selectTracksCreateLoading);
  const artistsData = useAppSelector(selectArtistsData);
  const albumsData = useAppSelector(selectAlbumsData);

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

  const fetchAlbumsByArtist = async (artistId: string) => {
    await dispatch(fetchAlbumsData(artistId));
  };

  const [state, setState] = useState<TrackMutationFrom>({
    artist: '',
    album: '',
    title: '',
    duration: '',
    trackNumber: '',
    youTubeLink: '',
  });

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

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (user) {
        if (
          state.album.trim().length !== 0 &&
          state.title.trim().length !== 0 &&
          state.duration.trim().length !== 0 &&
          state.trackNumber.trim().length !== 0
        ) {

          const newObjectData: TrackMutationObject = {
            album: state.album,
            title: state.title,
            duration: state.duration,
            trackNumber: state.trackNumber,
            youTubeLink: state.youTubeLink,
          };
          await dispatch(createTrack(newObjectData)).unwrap();
          setState({
            artist: '',
            album: '',
            title: '',
            duration: '',
            trackNumber: '',
            youTubeLink: '',
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
        <Typography variant={'h4'} sx={{mb: 2, color: '#fff'}}>Добавить новый трек</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Выберите артиста"
              select
              fullWidth
              required
              value={state.artist}
              name="artist"
              id="artist"
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
                <MenuItem
                  key={artist._id}
                  value={artist._id}
                  onClick={() => fetchAlbumsByArtist(artist._id)}>
                  {artist.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              select
              required
              fullWidth
              label="Выберите альбом"
              name="album"
              value={state.album}
              error={Boolean(getFieldError('album'))}
              helperText={getFieldError('album')}
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
                Пожалуйста выберите альбом
              </MenuItem>
              {albumsData &&
                albumsData.map((album) => (
                  <MenuItem key={album._id} value={album._id}>
                    {album.title}
                  </MenuItem>
                ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              onChange={inputChangeHandler}
              label="Название трека"
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
              label="Продолжительность трека"
              id="duration"
              required
              name="duration"
              value={state.duration}
              error={Boolean(getFieldError('duration'))}
              helperText={getFieldError('duration')}
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
              label="Номер трека"
              id="trackNumber"
              name="trackNumber"
              type="number"
              inputProps={{min: 0}}
              required
              value={state.trackNumber}
              error={Boolean(getFieldError('trackNumber'))}
              helperText={getFieldError('trackNumber')}
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
              label="Ссылка на видео 'YouTube'"
              id="youTubeLink"
              name="youTubeLink"
              value={state.youTubeLink}
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
        </Grid>
        <LoadingButton
          sx={{
            mt: 2,
            color: '#fff',
            background: '#1CD760',
            '&:hover': {
              background: '#14af4d',
            },
            '&.Mui-disabled': {
              background: '#b2b2b2',
              color: '#757575',
            }
          }}
          color="primary"
          type="submit"
          disabled={
            state.album.trim().length === 0 ||
            state.title.trim().length === 0 ||
            state.duration.trim().length === 0 ||
            state.trackNumber.trim().length === 0
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

export default TrackForm;