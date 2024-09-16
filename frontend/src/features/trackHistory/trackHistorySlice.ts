import {TrackHistoryTypes} from '../../types';
import {createSlice} from '@reduxjs/toolkit';

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
  extraReducers: () => {},
  selectors: {
    selectTrackHistories: (state ) => state.trackHistories,
    selectTrackHistoryFetchingLoader: (state) => state.trackHistoryFetchingLoader,
  }
});

export const trackHistoryReducer = trackHistorySlice.reducer;
export const {selectTrackHistories, selectTrackHistoryFetchingLoader} = trackHistorySlice.selectors;