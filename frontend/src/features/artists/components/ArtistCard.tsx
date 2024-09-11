import * as React from 'react';
import {ArtistsTypes} from '../../../types';
import noImage from '../../../assets/images/no-image.jpg';
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import {API_URL} from '../../../config';

interface Props {
  artist: ArtistsTypes;
}

const ArtistCard: React.FC<Props> = ({artist}) => {
  const imageUrl = artist.image ? `${API_URL}/${artist.image}` : noImage;
  return (
    <Card sx={{
      width: 220,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      transition: '.3s ease-in-out',
      boxShadow: 'none',
      '&:hover': {
        transform: 'scale(1.02)',
        backgroundColor: 'rgba(31 ,31, 31, .5)',
      },
    }}>
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
          mt: 2
        }}
        image={imageUrl}
        title="Фото исполнителя"
      />
      <CardContent>
        <Typography sx={{color: '#fff'}} gutterBottom variant="h5" component="div">{artist.name}</Typography>
        <Typography sx={{color: '#B3B3B3'}} variant="body2">Исполнитель</Typography>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;