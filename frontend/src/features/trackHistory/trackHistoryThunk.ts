import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TrackHistoryTypes} from '../../types';
import {RootState} from '../../app/store';

export const fetchTrackHistories = createAsyncThunk<TrackHistoryTypes[], void, { state: RootState }>(
  'trackHistory/fetchTrackHistories',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return rejectWithValue('Token is missing');
      }

      const {data: trackHistories} = await axiosApi.get<TrackHistoryTypes[]>('/track_history', {headers: {'Authorization': `Bearer ${token}`}});
      return trackHistories;
    } catch (error) {
      return rejectWithValue('Error fetching trackHistories ' + error);
    }
  }
);


export const sendTrackHistories = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistory/sendTrackHistories', async (trackId, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return rejectWithValue('Token is missing');
      }

      const data = {
        track: trackId,
      };

      await axiosApi.post('/track_history', data, {headers: {'Authorization': `Bearer ${token}`}});
    } catch (error) {
      return rejectWithValue('Error send trackHistories ' + error);
    }
  });