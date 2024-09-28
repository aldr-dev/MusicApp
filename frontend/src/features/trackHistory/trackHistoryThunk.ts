import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {TrackHistoryTypes} from '../../types';
import {RootState} from '../../app/store';

export const fetchTrackHistories = createAsyncThunk<TrackHistoryTypes[], void, { state: RootState }>(
  'trackHistory/fetchTrackHistories',
  async (_, {rejectWithValue}) => {
    try {
      const {data: trackHistories} = await axiosApi.get<TrackHistoryTypes[]>('/track_history');
      return trackHistories;
    } catch (error) {
      return rejectWithValue('Error fetching trackHistories ' + error);
    }
  }
);

export const sendTrackHistories = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistory/sendTrackHistories', async (trackId, {rejectWithValue}) => {
    try {
      const data = {
        track: trackId,
      };

      await axiosApi.post('/track_history', data);
    } catch (error) {
      return rejectWithValue('Error send trackHistories ' + error);
    }
  });

export const deleteTrackHistories = createAsyncThunk<void, string, { state: RootState }>(
  'trackHistory/deleteTrackHistories', async (trackId) => {
    await axiosApi.delete(`/track_history/${trackId}`);
  }
);