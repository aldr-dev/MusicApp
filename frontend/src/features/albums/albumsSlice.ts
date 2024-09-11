import {createSlice} from '@reduxjs/toolkit';
import {AlbumsTypes} from '../../types';
import {fetchAlbumsData} from './albumsThunks';

interface AlbumsState {
  albumsData: AlbumsTypes[];
  albumsFetchingLoader: boolean;
}

const initialState: AlbumsState = {
  albumsData: [],
  albumsFetchingLoader: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsData.pending, (state) => {
      state.albumsFetchingLoader = true;
    });
    builder.addCase(fetchAlbumsData.fulfilled, (state, {payload: albumsArray}) => {
      state.albumsFetchingLoader = false;
      state.albumsData = albumsArray;
    });
    builder.addCase(fetchAlbumsData.rejected, (state) => {
      state.albumsFetchingLoader = false;
    });
  },
  selectors: {
    selectAlbumsData: (state) => state.albumsData,
    selectAlbumsFetchingLoader: (state) => state.albumsFetchingLoader,
  },
});

export const albumsReducer = albumsSlice.reducer;
export const {selectAlbumsData, selectAlbumsFetchingLoader} = albumsSlice.selectors;