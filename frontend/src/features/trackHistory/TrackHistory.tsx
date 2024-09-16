import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectUser} from '../users/usersSlice';
import {selectTrackHistories, selectTrackHistoryFetchingLoader} from './trackHistorySlice';
import {useEffect} from 'react';
import {toast} from 'react-toastify';
import {Navigate} from 'react-router-dom';
import {fetchTrackHistories} from './trackHistoryThunk';
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import TrackHistoryTable from './components/TrackHistoryTable';

const TrackHistory = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const trackHistoriesLoader = useAppSelector(selectTrackHistoryFetchingLoader);
  const trackHistoriesData = useAppSelector(selectTrackHistories);

  useEffect(() => {
    if (user) {
      const fetchTrackHistoriesData = async () => {
        try {
          await dispatch(fetchTrackHistories()).unwrap();
        } catch (error) {
          toast.error('Произошла непредвиденная ошибка. Повторите попытку позже.');
          console.error('Произошла непредвиденная ошибка. Повторите попытку позже.', error);
        }
      };

      void fetchTrackHistoriesData();
    }
  }, [dispatch, user]);

  return (
    <>
      {!user ? (<Navigate to="/login"/>) : null}
      <Typography sx={{mb: 2}} variant="h5" color="#fff">История прослушивания</Typography>
      {trackHistoriesLoader ? (<CircularProgress sx={{color: '#fff'}}/>) : (
        <>
          {trackHistoriesData.length === 0 ? (
            <Typography variant="body2" color="#fff">
              Ваша история прослушивания пока пуста. Скоро здесь появятся новые треки. Начните слушать.
            </Typography>
          ) : (
            <TableContainer sx={{height: 'calc(100vh - 150px)', overflowX: 'auto'}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{color: '#fff', fontWeight: 'bold', fontSize: '15px', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>Имя исполнителя</TableCell>
                    <TableCell sx={{color: '#fff', fontWeight: 'bold', fontSize: '15px', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>Название композиции</TableCell>
                    <TableCell sx={{color: '#fff', fontWeight: 'bold', fontSize: '15px', borderBottomColor: 'rgba(255, 255, 255, .1)'}}>Дата прослушивания</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trackHistoriesData.map((trackHistory) => (
                    <TrackHistoryTable key={trackHistory._id} trackHistory={trackHistory}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </>
      )}
    </>
  );
};

export default TrackHistory;