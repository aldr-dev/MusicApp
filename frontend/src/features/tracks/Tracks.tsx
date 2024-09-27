import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {fetchTracksData} from './tracksThunks';
import {useParams} from 'react-router-dom';
import {selectTracksData, selectTracksFetchingLoader} from './tracksSlice';
import {fetchOneArtist} from '../artists/artistsThunks';
import InfoIcon from '@mui/icons-material/Info';
import {
  Box,
  CircularProgress,
  Grid,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import {API_URL} from '../../config';
import noImage from '../../assets/images/no-image.jpg';
import {selectOneArtist} from '../artists/artistsSlice';
import TracksTable from './components/TracksTable';
import {toast} from 'react-toastify';
import {selectUser} from '../users/usersSlice';

const Tracks = () => {
  const {id} = useParams();
  const user = useAppSelector(selectUser);
  const tracksData = useAppSelector(selectTracksData);
  const oneArtist = useAppSelector(selectOneArtist);
  const tracksFetchingLoader = useAppSelector(selectTracksFetchingLoader);

  const album = tracksData.find((track) => track.album._id === id)?.album;
  const imageUrl = album?.image ? `${API_URL}/${album?.image}` : noImage;

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchTracks = () => {
      try {
        if (id) {
          dispatch(fetchTracksData(id));
          if (album?.artist) {
            dispatch(fetchOneArtist(album.artist));
          }
        }
      } catch (error) {
        toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
        console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
      }
    };

    void fetchTracks();
  }, [dispatch, id, album?.artist]);

  return (
    <>
      {!user && (<Box sx={{mb: 2, display: 'flex', alightItems: 'center', gap: '5px'}} color="#fff">{user ? null : (<><InfoIcon/> Чтобы прослушать треки, необходимо авторизоваться.</>)}</Box>)}
      <Typography sx={{mb: 2}} variant="h5" color="#fff">Треки</Typography>
      {tracksFetchingLoader ? (
        <CircularProgress sx={{color: '#fff'}}/>
      ) : (
        <>
          {album && oneArtist && (
            <Grid container spacing={2} alignItems="flex-end" marginBottom="24px">
              <Grid item>
                <Box
                  component="img"
                  src={imageUrl}
                  alt="Sample"
                  sx={{width: '200px', height: '200px', objectFit: 'cover', borderRadius: '8px'}}
                />
              </Grid>
              <Grid item>
                <Typography variant="body1" color="#b3b3b3">
                  Альбом
                </Typography>
                <Typography variant="h4" fontWeight="bold" color="#fff">
                  {album.title}
                </Typography>
                <Typography variant="h6" color="#b3b3b3">
                  {oneArtist.name}
                </Typography>
              </Grid>
            </Grid>
          )}

          {tracksData.length === 0 ? (
            <Typography variant="body2" color="#fff">
              В данный момент наш список треков пуст. Мы активно работаем над его пополнением и скоро вас порадуют
              новыми хитами! Спасибо за ваше терпение.
            </Typography>
          ) : (
            <TableContainer sx={{height: 'calc(100vh - 420px)', overflowX: 'auto'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color: '#fff', fontWeight: 'bold', fontSize: '15px', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>#</TableCell>
                    <TableCell sx={{color: '#fff', fontWeight: 'bold', fontSize: '15px', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>Название трека</TableCell>
                    <TableCell sx={{color: '#fff', fontWeight: 'bold', fontSize: '15px', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>Продолжительность</TableCell>
                    <TableCell sx={{color: '#fff', fontWeight: 'bold', fontSize: '15px', borderBottomColor: 'rgba(255, 255, 255, .1)'}}></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tracksData.map((track) => (
                    <TracksTable key={track._id} track={track}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
};

export default Tracks;