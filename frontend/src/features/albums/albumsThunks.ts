import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsTypes} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const fetchAlbumsData = createAsyncThunk<AlbumsTypes[], string, {state: RootState}>(
  'albums/fetchAlbumsData',
  async (artistId) => {
    const { data:  albums } = await axiosApi.get<AlbumsTypes[]>(`/albums?artist=${artistId}`);
    return albums;
  });