import {createSlice} from '@reduxjs/toolkit';
import {TracksTypes, ValidationError} from '../../types';
import {createTrack, fetchTracksData} from './tracksThunks';

interface TracksState {
  tracksData: TracksTypes[];
  tracksFetchingLoader: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: TracksState = {
  tracksData: [],
  tracksFetchingLoader: false,
  createLoading: false,
  createError: null,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTrack.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createTrack.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.createError = error || null;
    });

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
    selectTracksCreateLoading: (state) => state.createLoading,
    selectTracksCreateError: (state) => state.createError,
  },
});

export const tracksReducer = tracksSlice.reducer;
export const {
  selectTracksData,
  selectTracksFetchingLoader,
  selectTracksCreateLoading,
  selectTracksCreateError,
} = tracksSlice.selectors;