import React from 'react';
import {TableCell, TableRow} from '@mui/material';
import {TrackHistoryTypes} from '../../../types';
import dayjs from 'dayjs';

interface Props {
  trackHistory: TrackHistoryTypes;
}

const TrackHistoryTable: React.FC<Props> = ({trackHistory}) => {
  return (
    <TableRow>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {trackHistory.artist.name}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {trackHistory.track.title}
      </TableCell>
      <TableCell sx={{color: '#fff', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>
        {dayjs(trackHistory.datetime).format('DD/MM/YYYY HH:mm:ss')}
      </TableCell>
    </TableRow>
  );
};

export default TrackHistoryTable;