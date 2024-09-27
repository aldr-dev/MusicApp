import {createAsyncThunk} from '@reduxjs/toolkit';
import {CreateTrackMutation, TracksTypes, ValidationError} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';

export const createTrack = createAsyncThunk<void, CreateTrackMutation, {state: RootState, rejectValue: ValidationError }>(
  'tracks/createTrack', async (data, {rejectWithValue}) => {
    try {
      await axiosApi.post<CreateTrackMutation>('/tracks', data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  });

export const fetchTracksData = createAsyncThunk<TracksTypes[], string, {state: RootState}>(
  'tracks/fetchTracksData',
  async (albumId) => {
    const { data: tracks } = await axiosApi.get<TracksTypes[]>(`/tracks?album=${albumId}`);
    return tracks;
  });

export const toggleTrack = createAsyncThunk<void, string>(
  'tracks/toggleTrack',
  async (id) => {
    await axiosApi.patch(`/tracks/${id}/togglePublished`);
  },
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/deleteTrack',
  async (id) => {
    await axiosApi.delete(`/tracks/${id}`);
  },
);