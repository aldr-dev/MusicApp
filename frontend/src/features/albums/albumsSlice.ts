import {createSlice} from '@reduxjs/toolkit';
import {AlbumsTypes, ValidationError} from '../../types';
import {createAlbum, fetchAlbumsData} from './albumsThunks';

interface AlbumsState {
  albumsData: AlbumsTypes[];
  albumsFetchingLoader: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: AlbumsState = {
  albumsData: [],
  albumsFetchingLoader: false,
  createLoading: false,
  createError: null,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createAlbum.pending, (state) => {
      state.createLoading = true;
      state.createError = null;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createAlbum.rejected, (state, {payload: error}) => {
      state.createLoading = false;
      state.createError = error || null;
    });

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
    selectAlbumsCreateLoading: (state) => state.createLoading,
    selectAlbumsCreateError: (state) => state.createError,
  },
});

export const albumsReducer = albumsSlice.reducer;
export const {
  selectAlbumsData,
  selectAlbumsFetchingLoader,
  selectAlbumsCreateLoading,
  selectAlbumsCreateError,
} = albumsSlice.selectors;