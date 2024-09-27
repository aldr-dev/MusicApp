import React, {useState} from 'react';
import {Box, Button, Menu, MenuItem, TableCell, TableRow, Typography} from '@mui/material';
import {TracksTypes} from '../../../types';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {sendTrackHistories} from '../../trackHistory/trackHistoryThunk';
import {toast} from 'react-toastify';
import {deleteTrack, fetchTracksData, toggleTrack} from '../tracksThunks';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  track: TracksTypes;
}

const TracksTable: React.FC<Props> = ({track}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const playYouTubePlayer = (youTubeLink: string) => {
    window.open(youTubeLink, 'YouTube Player', 'width=500,height=500');
  };

  const handleClickPlayer = async (trackId: string) => {
    if (user) {
      try {
        if (track.youTubeLink) {
          playYouTubePlayer(track.youTubeLink);
        }
        await dispatch(sendTrackHistories(trackId)).unwrap();
      } catch (error) {
        toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
        console.error('Произошла непредвиденная ошибка. Повторите попытку позже. ' + error);
      }
    }
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleIsPublishedTrack = async () => {
    await dispatch(toggleTrack(track._id));
    await dispatch(fetchTracksData(track.album._id));
  };

  const handleDeleteTrack = async () => {
    const confirmDelete = confirm('Вы действительно хотите удалить трек?');
    if (confirmDelete) {
      await dispatch(deleteTrack(track._id));
      await dispatch(fetchTracksData(track.album._id));
    }
  };

  const isArtistOwner = track.user === user?._id;
  const isAdmin = user?.role === 'admin';

  return (
    <TableRow>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)', height: '70px'}}>
        {track.trackNumber}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)', display: 'flex', alignItems: 'center', gap: '10px', height: '70px'}}>
        {user ?
          <PlayCircleIcon onClick={() => handleClickPlayer(track._id)}
            sx={{
              cursor: 'pointer',
              transition: 'color 0.3s, transform 0.3s',
              '&:active': {
                transform: 'scale(1.3)',
              },
              '&:hover': {
                color: '#69f199',
              }
            }}
          /> : null}
        {track.title}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)', height: '70px'}}>
        {track.duration}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)', height: '70px'}}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '20px' }}>

          {!track.isPublished && (isArtistOwner || isAdmin) && (
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

          {((!track.isPublished && isArtistOwner) || isAdmin) && (
            <Box>
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
                {!track.isPublished && isAdmin && (
                  <MenuItem onClick={handleIsPublishedTrack} sx={{ padding: '4px 8px', fontSize: '0.875rem' }}>
                    <PublishIcon sx={{ fontSize: '18px' }} />&nbsp;Опубликовать
                  </MenuItem>
                )}
                {(isArtistOwner || isAdmin) && (
                  <MenuItem onClick={handleDeleteTrack} sx={{ padding: '4px 8px', fontSize: '0.875rem' }}>
                    <DeleteIcon sx={{ fontSize: '18px' }} />&nbsp;Удалить
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default TracksTable;