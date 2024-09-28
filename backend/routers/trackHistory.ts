import express from 'express';
import mongoose from 'mongoose';
import TrackHistory from '../models/TrackHistory';
import auth, {RequestWithUser} from '../middleware/auth';
import Track from '../models/Track';
import Album from '../models/Album';
import Artist from '../models/Artist';
import permit from '../middleware/permit';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackId = req.body.track;
    if (!trackId) {
      return res.status(400).send({error: 'Track ID is required'});
    }

    const track = await Track.findById(trackId);
    if (!track) {
      return res.status(404).send({error: 'No such track!'});
    }

    const album = await Album.findById(track.album);
    if (!album) {
      return res.status(404).send({error: 'No such album!'});
    }

    const artist = await Artist.findById(album.artist);
    if (!artist) {
      return res.status(404).send({error: 'No such artist!'});
    }

    const userHistory = new TrackHistory({
      track: trackId,
      user: req.user?._id,
      datetime: new Date().toISOString(),
      artist: artist._id,
    });

    await userHistory.save();
    res.send(userHistory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

trackHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const trackHistory = await TrackHistory.find({user: req.user?._id}).populate('track').populate('artist', 'name').sort({datetime: -1});
    return res.send(trackHistory);
  } catch (error) {
    return next(error);
  }
});

trackHistoryRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;

    const foundTrackID = await TrackHistory.findOne({track: id});

    if (!foundTrackID) {
      return res.status(404).send({error: 'Track id not found!'});
    }

    if (foundTrackID.user.toString() !== req.user?._id.toString()) {
      return res.status(403).send({error: 'Access denied You can\'t delete someone else\'s track from history'});
    }

    await TrackHistory.findByIdAndDelete(foundTrackID._id);

    return res.send({message: 'The track has been removed from your listening history.'});
  } catch (error) {
    return next(error);
  }
});

export default trackHistoryRouter;