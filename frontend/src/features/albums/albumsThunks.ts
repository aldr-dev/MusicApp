import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsTypes, CreateAlbumMutation, ValidationError} from '../../types';
import {RootState} from '../../app/store';
import axiosApi from '../../axiosApi';
import {isAxiosError} from 'axios';

export const createAlbum = createAsyncThunk<void, CreateAlbumMutation, {state: RootState, rejectValue: ValidationError }>(
  'albums/createAlbum', async (data, {rejectWithValue}) => {
    try {
      const formData = new FormData();
      formData.append('artist', data.artist);
      formData.append('title', data.title);
      formData.append('dataRelease', data.dataRelease.toString());

      if (data.image) {
        formData.append('image', data.image);
      }

      await axiosApi.post<CreateAlbumMutation>('/albums', formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  });

export const fetchAlbumsData = createAsyncThunk<AlbumsTypes[], string, {state: RootState}>(
  'albums/fetchAlbumsData',
  async (artistId) => {
    const { data:  albums } = await axiosApi.get<AlbumsTypes[]>(`/albums?artist=${artistId}`);
    return albums;
  });


export const toggleAlbum = createAsyncThunk<void, string>(
  'albums/toggleAlbum',
  async (id) => {
    await axiosApi.patch(`/albums/${id}/togglePublished`);
  },
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/deleteAlbum',
  async (id) => {
    await axiosApi.delete(`/albums/${id}`);
  },
);