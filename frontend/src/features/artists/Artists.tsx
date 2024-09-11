import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {fetchArtistsData} from './artistsThunks';
import {toast} from 'react-toastify';
import {selectArtistsData, selectArtistsFetchingLoader} from './artistsSlice';
import {Box, CircularProgress, Typography} from '@mui/material';
import ArtistCard from './components/ArtistCard';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artistData = useAppSelector(selectArtistsData);
  const artistFetchingLoader = useAppSelector(selectArtistsFetchingLoader);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        await dispatch(fetchArtistsData()).unwrap();
      } catch (error) {
        toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
        console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
      }
    };

    void fetchArtistData();
  }, [dispatch]);

  return (
    <>
      <Typography sx={{mb: 2}} variant="h5" color="#fff">Исполнители</Typography>
      {artistFetchingLoader ? (<CircularProgress sx={{color: '#fff'}}/>) : (
        <>
          {artistData.length === 0 ? (
            <Typography variant="body2" color="#fff">В данный момент наш список артистов пуст. Мы активно работаем над его
              наполнением и скоро вас порадуют новые имена! Спасибо за терпение.</Typography>) : (
            <Box display="flex" gap={2} flexWrap="wrap">
              {artistData.map((artist) => (
                <ArtistCard key={artist._id} artist={artist}/>
              ))}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Artists;