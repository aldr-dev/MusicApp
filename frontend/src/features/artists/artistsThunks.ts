import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ArtistsTypes, CreateArtistMutation, ValidationError} from '../../types';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';

export const createArtist = createAsyncThunk<void, CreateArtistMutation, { state: RootState, rejectValue: ValidationError }>(
  'artists/createArtist', async (data, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);

      if (data.information) {
        formData.append('information', data.information);
      }
      if (data.image) {
        formData.append('image', data.image);
      }

      await axiosApi.post<CreateArtistMutation>('/artists', formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  });

export const fetchArtistsData = createAsyncThunk<ArtistsTypes[], void, { state: RootState }>(
  'artists/fetchArtistsData',
  async () => {
    const {data: artists} = await axiosApi.get<ArtistsTypes[]>('/artists');
    return artists;
  });

export const fetchOneArtist = createAsyncThunk<ArtistsTypes, string, { state: RootState }>(
  'artists/fetchOneArtist',
  async (artistId) => {
    const {data: oneArtist} = await axiosApi.get<ArtistsTypes>(`/artists/${artistId}`);
    return oneArtist;
  });

export const toggleArtist = createAsyncThunk<void, string>(
  'artists/toggleArtist',
  async (id) => {
    await axiosApi.patch(`/artists/${id}/togglePublished`);
  },
);

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/deleteArtist',
  async (id) => {
    await axiosApi.delete(`/artists/${id}`);
  },
);