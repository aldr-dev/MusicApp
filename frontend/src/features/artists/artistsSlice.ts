import {createSlice} from '@reduxjs/toolkit';
import {ArtistsTypes} from '../../types';
import {fetchArtistsData, fetchOneArtist} from './artistsThunks';

interface ArtistsState {
  artistsData: ArtistsTypes[];
  oneArtist: ArtistsTypes | null;
  artistsFetchingLoader: boolean;
  oneArtistFetchingLoader: boolean;
}

const initialState: ArtistsState = {
  artistsData: [],
  oneArtist: null,
  artistsFetchingLoader: false,
  oneArtistFetchingLoader: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export const artistsReducer = artistsSlice.reducer;
export const {selectArtistsData, selectArtistsFetchingLoader, selectOneArtist} = artistsSlice.selectors;