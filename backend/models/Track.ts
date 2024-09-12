import mongoose, {Schema, Types} from 'mongoose';
import Album from './Album';
import {TrackFields} from '../types';

const TrackSchema = new mongoose.Schema<TrackFields>({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await Album.findById(value);
        return Boolean(album);
      },
      message: 'Album does not exist',
    }
  },
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  trackNumber: {
    type: Number,
    required: true,
    unique: true,
  }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;