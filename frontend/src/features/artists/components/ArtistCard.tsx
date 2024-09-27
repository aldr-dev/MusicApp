import * as React from 'react';
import { ArtistsTypes } from '../../../types';
import noImage from '../../../assets/images/no-image.jpg';
import { Box, Button, Card, CardActions, CardContent, CardMedia, Menu, MenuItem, Typography } from '@mui/material';
import { API_URL } from '../../../config';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../users/usersSlice';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteArtist, fetchArtistsData, toggleArtist } from '../artistsThunks';

interface Props {
  artist: ArtistsTypes;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const imageUrl = artist.image ? `${API_URL}/${artist.image}` : noImage;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIsPublishedArtist = async () => {
    await dispatch(toggleArtist(artist._id));
    await dispatch(fetchArtistsData());
  };

  const handleDeleteArtist = async () => {
    const confirmDelete = confirm('Вы действительно хотите удалить артиста?');
    if (confirmDelete) {
      await dispatch(deleteArtist(artist._id));
      await dispatch(fetchArtistsData());
    }
  };

  const isArtistOwner = artist.user === user?._id;
  const isAdmin = user?.role === 'admin';

  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      width: 220,
      textDecoration: 'none',
      backgroundColor: 'transparent',
      transition: '.3s ease-in-out',
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: 'rgba(31, 31, 31, .5)',
      },
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 10px 0 10px' }}>

        {!artist.isPublished && (isArtistOwner || isAdmin) && (
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


        {((!artist.isPublished && isArtistOwner) || isAdmin) && (
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
              {!artist.isPublished && isAdmin && (
                <MenuItem onClick={handleIsPublishedArtist} sx={{ padding: '4px 8px', fontSize: '0.875rem' }}>
                  <PublishIcon sx={{ fontSize: '18px' }} />&nbsp;Опубликовать
                </MenuItem>
              )}
              {(isArtistOwner || isAdmin) && (
                <MenuItem onClick={handleDeleteArtist} sx={{ padding: '4px 8px', fontSize: '0.875rem' }}>
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
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt: 3
        }}
        image={imageUrl}
        title="Фото исполнителя"
      />
      <CardContent>
        <Typography sx={{ color: '#fff' }} gutterBottom variant="h5" component="div">
          {artist.name}
        </Typography>
        <Typography sx={{ color: '#B3B3B3' }} variant="body2">
          Исполнитель
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Button
          component={Link}
          to={`/albums/${artist._id}`}
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
  );
};

export default ArtistCard;