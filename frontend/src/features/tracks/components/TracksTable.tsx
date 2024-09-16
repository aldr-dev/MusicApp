import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import {TracksTypes} from '../../../types';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {sendTrackHistories} from '../../trackHistory/trackHistoryThunk';
import {toast} from 'react-toastify';

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

  return (
    <TableRow>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {track.trackNumber}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)', display: 'flex', alignItems: 'center', gap: '10px'}}>
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
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {track.duration}
      </TableCell>
    </TableRow>
  );
};

export default TracksTable;