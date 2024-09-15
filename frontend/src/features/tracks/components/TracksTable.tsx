import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import {TracksTypes} from '../../../types';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';

interface Props {
  track: TracksTypes;
}

const TracksTable: React.FC<Props> = ({track}) => {
  const user = useAppSelector(selectUser);
  return (
    <TableRow>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {track.trackNumber}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)', display: 'flex', alignItems: 'center', gap: '10px'}}>
        {user ?
          <PlayCircleIcon
            sx={{
              cursor: 'pointer',
              transition: 'transform 0.3s',
              '&:active': {
                transform: 'scale(1.3)',
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