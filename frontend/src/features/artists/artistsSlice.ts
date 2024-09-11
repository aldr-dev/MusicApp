import {createSlice} from '@reduxjs/toolkit';
import {ArtistsTypes} from '../../types';
import {fetchArtistsData} from './artistsThunks';

interface ArtistsState {
  artistsData: ArtistsTypes[];
  artistsFetchingLoader: boolean;
}

const initialState: ArtistsState = {
  artistsData: [],
  artistsFetchingLoader: false,
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
  },
  selectors: {
    selectArtistsData: (state) => state.artistsData,
    selectArtistsFetchingLoader: (state) => state.artistsFetchingLoader,
  },
});

export const artistsReducer = artistsSlice.reducer;
export const {selectArtistsData, selectArtistsFetchingLoader} = artistsSlice.selectors;