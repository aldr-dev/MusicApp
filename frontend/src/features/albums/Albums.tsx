import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {Box, CircularProgress, Typography} from '@mui/material';
import {selectAlbumsData, selectAlbumsFetchingLoader} from './albumsSlice';
import {fetchAlbumsData} from './albumsThunks';
import {useParams} from 'react-router-dom';
import AlbumsCard from './components/AlbumsCard';

const Albums = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const albumsData = useAppSelector(selectAlbumsData);
  const albumsFetchingLoader = useAppSelector(selectAlbumsFetchingLoader);

  useEffect(() => {
    if (id) {
      const fetchAlbums = async () => {
        try {
          await dispatch(fetchAlbumsData(id)).unwrap();
        } catch (error) {
          toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
          console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
        }
      };

      void fetchAlbums();
    }
  }, [dispatch, id]);

  return (
    <>
      <Typography sx={{mb: 2}} variant="h5" color="#fff">Альбомы</Typography>
      {albumsFetchingLoader ? (<CircularProgress sx={{color: '#fff'}}/>) : (
        <>
          {albumsData.length === 0 ? (
            <Typography variant="body2" color="#fff">В данный момент альбомов нет, но мы уже работаем над их
              добавлением. Спасибо за ваше терпение!.</Typography>) : (
            <Box display="flex" sx={{mb: 2}} gap={1} flexWrap="wrap">
              {albumsData.map((album) => (
               <AlbumsCard key={album._id} album={album}/>
              ))}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Albums;