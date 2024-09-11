import * as React from 'react';
import {AlbumsTypes} from '../../../types';
import noImage from '../../../assets/images/no-image.jpg';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {API_URL} from '../../../config';

interface Props {
  album: AlbumsTypes;
}

const AlbumsCard: React.FC<Props> = ({album}) => {
  const imageUrl = album.image ? `${API_URL}/${album.image}` : noImage;
  return (
    <Card sx={{
      width: 220,
      cursor: 'pointer',
      textDecoration: 'none',
      backgroundColor: 'rgba(31 ,31, 31, .5)',
      transition: '.3s ease-in-out',
      boxShadow: 'none',
      '&:hover': {
        transform: 'scale(1.02)',
      },
    }}>
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
    </Card>
  );
};

export default AlbumsCard;