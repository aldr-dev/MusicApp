import * as React from 'react';
import {useState} from 'react';
import {AlbumsTypes} from '../../../types';
import noImage from '../../../assets/images/no-image.jpg';
import {Box, Button, Card, CardActions, CardContent, CardMedia, Menu, MenuItem, Typography} from '@mui/material';
import {API_URL} from '../../../config';
import {Link} from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteAlbum, fetchAlbumsData, toggleAlbum} from '../albumsThunks';

interface Props {
  album: AlbumsTypes;
}

const AlbumsCard: React.FC<Props> = ({album}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const imageUrl = album.image ? `${API_URL}/${album.image}` : noImage;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIsPublishedAlbum = async () => {
    await dispatch(toggleAlbum(album._id));
    await dispatch(fetchAlbumsData(album.artist._id));
  };

  const handleDeleteAlbum = async () => {
    const confirmDelete = confirm('Вы действительно хотите удалить альбом?');
    if (confirmDelete) {
      await dispatch(deleteAlbum(album._id));
      await dispatch(fetchAlbumsData(album.artist._id));
    }
  };

  const isArtistOwner = album.user === user?._id;
  const isAdmin = user?.role === 'admin';

  return (
    <>
      <Card sx={{
        display: 'flex',
        flexDirection: 'column',
        width: 220,
        textDecoration: 'none',
        backgroundColor: 'rgba(31 ,31, 31, .5)',
        boxShadow: 'none',
      }}>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px 0 10px' }}>

          {!album.isPublished && (isArtistOwner || isAdmin) && (
            <Typography
              sx={{
                color: '#fff',
                background: '#f34e3e',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                padding: '4px 8px',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '0.875rem',
              }}
              variant='body2'>
              Не опубликован
            </Typography>
          )}

          {((!album.isPublished && isArtistOwner) || isAdmin) && (
            <Box sx={{ display: 'flex', marginLeft: 'auto' }}>
              <Button
                onClick={handleClick}
                sx={{
                  minWidth: 0,
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  backgroundColor: '#1f1f1f',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#333'
                  },
                }}>
                <MoreHorizIcon />
              </Button>
              <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted sx={{ '& .MuiPaper-root': { minWidth: 120 } }}>
                {!album.isPublished && isAdmin && (
                  <MenuItem onClick={handleIsPublishedAlbum} sx={{ padding: '4px 8px', fontSize: '0.875rem' }}>
                    <PublishIcon sx={{ fontSize: '18px' }} />&nbsp;Опубликовать
                  </MenuItem>
                )}
                {(isArtistOwner || isAdmin) && (
                  <MenuItem onClick={handleDeleteAlbum} sx={{ padding: '4px 8px', fontSize: '0.875rem' }}>
                    <DeleteIcon sx={{ fontSize: '18px' }} />&nbsp;Удалить
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
        </Box>

        <CardMedia
          sx={{
            width: 150,
            height: 150,
            margin: 'auto',
            objectFit: 'cover',
            borderRadius: '10px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 3
          }}
          image={imageUrl}
          title="Фото альбома"
        />
        <CardContent>
          <Typography sx={{color: '#fff', fontWeight: 'bold'}} gutterBottom variant="h5" component="div">{album.title}</Typography>
          <Typography sx={{color: '#fff'}} gutterBottom variant="body2" component="div">{album.dataRelease}.г - {album.trackCount} трек(ов) &middot; <span style={{color: '#B3B3B3'}}>Альбом</span></Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            component={Link}
            to={`/tracks/${album._id}`}
            variant="contained"
            endIcon={<ArrowForwardIosIcon />}
            sx={{
              color: '#fff',
              backgroundColor: '#1f1f1f',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}>
            Перейти к альбомам
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AlbumsCard;