import {createAsyncThunk} from '@reduxjs/toolkit';
import {TracksTypes} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';

export const fetchTracksData = createAsyncThunk<TracksTypes[], string, {state: RootState}>(
  'tracks/fetchTracksData',
  async (albumId) => {
    const { data: tracks } = await axiosApi.get<TracksTypes[]>(`/tracks?album=${albumId}`);
    return tracks;
  });