import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ArtistsTypes} from '../../types';
import {RootState} from '../../app/store';

export const fetchArtistsData = createAsyncThunk<ArtistsTypes[], void, {state: RootState}>(
  'artists/fetchArtistsData',
  async () => {
  const { data: artists } = await axiosApi.get<ArtistsTypes[]>('/artists');
  return artists;
});