import {configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../features/artists/artistsSlice';
import {albumsReducer} from '../features/albums/albumsSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;