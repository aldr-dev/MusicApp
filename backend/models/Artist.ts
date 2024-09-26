import mongoose, {Schema, Types} from 'mongoose';
import {ArtistFields} from '../types';
import User from './User';

const ArtistSchema = new mongoose.Schema<ArtistFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist',
    }
  },
  name: {
    type: String,
    required: true,
  },
  image: String,
  information: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;