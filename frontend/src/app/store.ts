import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../features/artists/artistsSlice';
import {albumsReducer} from '../features/albums/albumsSlice';
import {tracksReducer} from '../features/tracks/tracksSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore} from 'redux-persist';
import {usersReducer} from '../features/users/usersSlice';
import {trackHistoryReducer} from '../features/trackHistory/trackHistorySlice';

const userPersistConfig = {
  key: 'musicApp:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  trackHistory: trackHistoryReducer,
  users: persistReducer(userPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    });
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;