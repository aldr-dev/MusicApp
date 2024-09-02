import mongoose, {Schema, Types} from 'mongoose';
import Album from './Album';

const TrackSchema = new mongoose.Schema({
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
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;