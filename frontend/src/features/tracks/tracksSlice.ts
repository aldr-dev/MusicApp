import {createSlice} from '@reduxjs/toolkit';
import {TracksTypes} from '../../types';
import {fetchTracksData} from './tracksThunks';

interface TracksState {
  tracksData: TracksTypes[];
  tracksFetchingLoader: boolean;
}

const initialState: TracksState = {
  tracksData: [],
  tracksFetchingLoader: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracksData.pending, (state) => {
      state.tracksFetchingLoader = true;
    });
    builder.addCase(fetchTracksData.fulfilled, (state, {payload: tracksArray }) => {
      state.tracksFetchingLoader = false;
      state.tracksData = tracksArray;
    });
    builder.addCase(fetchTracksData.rejected, (state) => {
      state.tracksFetchingLoader = false;
    });
  },
  selectors: {
    selectTracksData: (state) => state.tracksData,
    selectTracksFetchingLoader: (state) => state.tracksFetchingLoader,
  },
});

export const tracksReducer = tracksSlice.reducer;
export const {selectTracksData, selectTracksFetchingLoader} = tracksSlice.selectors;