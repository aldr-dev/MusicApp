import {createSlice} from '@reduxjs/toolkit';
import {ArtistsTypes, ValidationError} from '../../types';
import {createArtist, fetchArtistsData, fetchOneArtist} from './artistsThunks';

interface ArtistsState {
  artistsData: ArtistsTypes[];
  oneArtist: ArtistsTypes | null;
  createLoading: boolean;
  artistsFetchingLoader: boolean;
  oneArtistFetchingLoader: boolean;
  createError: ValidationError | null;
}

const initialState: ArtistsState = {
  artistsData: [],
  oneArtist: null,
  createLoading: false,
  artistsFetchingLoader: false,
  oneArtistFetchingLoader: false,
  createError: null,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createArtist.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createArtist.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.createError = error || null;
    });

    builder.addCase(fetchArtistsData.pending, (state) => {
      state.artistsFetchingLoader = true;
    });
    builder.addCase(fetchArtistsData.fulfilled, (state, {payload: artistsArray}) => {
      state.artistsFetchingLoader = false;
      state.artistsData = artistsArray;
    });
    builder.addCase(fetchArtistsData.rejected, (state) => {
      state.artistsFetchingLoader = false;
    });

    builder.addCase(fetchOneArtist.pending, (state) => {
      state.oneArtistFetchingLoader = true;
    });
    builder.addCase(fetchOneArtist.fulfilled, (state, {payload: oneArtistData}) => {
      state.oneArtistFetchingLoader = false;
      state.oneArtist = oneArtistData;
    });
    builder.addCase(fetchOneArtist.rejected, (state) => {
      state.oneArtistFetchingLoader = false;
    });
  },
  selectors: {
    selectArtistsData: (state) => state.artistsData,
    selectArtistsFetchingLoader: (state) => state.artistsFetchingLoader,
    selectOneArtist: (state) => state.oneArtist,
    selectArtistCreateLoading: (state) => state.createLoading,
    selectArtistCreateError: (state) => state.createError,
  },
});

export const artistsReducer = artistsSlice.reducer;
export const {
  selectArtistsData,
  selectArtistsFetchingLoader,
  selectOneArtist,
  selectArtistCreateLoading,
  selectArtistCreateError,
} = artistsSlice.selectors;