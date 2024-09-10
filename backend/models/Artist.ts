import mongoose from 'mongoose';
import {ArtistFields} from '../types';

const ArtistSchema = new mongoose.Schema<ArtistFields>({
  name: {
    type: String,
    required: true,
  },
  image: String,
  information: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;