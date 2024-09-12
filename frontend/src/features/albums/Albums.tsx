import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {Box, CircularProgress, Typography} from '@mui/material';
import {selectAlbumsData, selectAlbumsFetchingLoader} from './albumsSlice';
import {fetchAlbumsData} from './albumsThunks';
import {useParams} from 'react-router-dom';
import AlbumsCard from './components/AlbumsCard';
import {fetchOneArtist} from '../artists/artistsThunks';
import {selectOneArtist} from '../artists/artistsSlice';

const Albums = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const albumsData = useAppSelector(selectAlbumsData);
  const albumsFetchingLoader = useAppSelector(selectAlbumsFetchingLoader);
  const oneArtist = useAppSelector(selectOneArtist);

  useEffect(() => {
    if (id) {
      const fetchAlbums = async () => {
        try {
          await dispatch(fetchAlbumsData(id)).unwrap();
          await dispatch(fetchOneArtist(id)).unwrap();
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
      <Typography sx={{mb: 2}} variant="h5" color="#fff">Альбомы &middot; Исполнитель: {oneArtist?.name}</Typography>
      {albumsFetchingLoader ? (<CircularProgress sx={{color: '#fff'}}/>) : (
        <>
          {albumsData.length === 0 ? (
            <Typography variant="body2" color="#fff">В данный момент альбомов нет, но мы уже работаем над их
              добавлением. Спасибо за ваше терпение!</Typography>) : (
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