import {TrackHistoryTypes} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchTrackHistories} from './trackHistoryThunk';

interface TrackHistory {
  trackHistories: TrackHistoryTypes[];
  trackHistoryFetchingLoader: boolean;
}

const initialState: TrackHistory = {
  trackHistories: [],
  trackHistoryFetchingLoader: false,
};

export const trackHistorySlice = createSlice({
  name: 'trackHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTrackHistories.pending, (state) => {
      state.trackHistoryFetchingLoader = true;
    });
    builder.addCase(fetchTrackHistories.fulfilled, (state, {payload: trackHistoriesData}) => {
      state.trackHistoryFetchingLoader = false;
      state.trackHistories = trackHistoriesData;
    });
    builder.addCase(fetchTrackHistories.rejected, (state) => {
      state.trackHistoryFetchingLoader = false;
    });
  },
  selectors: {
    selectTrackHistories: (state) => state.trackHistories,
    selectTrackHistoryFetchingLoader: (state) => state.trackHistoryFetchingLoader,
  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const {selectTrackHistories, selectTrackHistoryFetchingLoader} = trackHistorySlice.selectors;