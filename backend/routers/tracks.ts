import express from 'express';
import Track from '../models/Track';
import {TracksTypes} from '../types';
import mongoose from 'mongoose';

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let tracks;
    const tracksId = req.query.album as string;

    if (tracksId) {
      tracks = await Track.find({album: tracksId}).populate('album').sort({ trackNumber: 1 });
    } else {
      tracks = await Track.find().sort({ trackNumber: 1 });
    }
    return res.send(tracks);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: TracksTypes = {
      album: req.body.album,
      title: req.body.title,
      duration: req.body.duration,
      trackNumber: req.body.trackNumber,
      youTubeLink: req.body.youTubeLink,
    }

    const track = new Track(trackData);
    await track.save();
    return res.send(track);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

export default tracksRouter;