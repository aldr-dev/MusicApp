import {TableCell, TableRow} from '@mui/material';
import {TracksTypes} from '../../../types';
import React from 'react';

interface Props {
  track: TracksTypes;
}

const TracksTable: React.FC<Props> = ({track}) => {
  return (
    <TableRow>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {track.trackNumber}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {track.title}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {track.duration}
      </TableCell>
    </TableRow>
  );
};

export default TracksTable;