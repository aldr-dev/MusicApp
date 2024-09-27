import express from 'express';
import Track from '../models/Track';
import {TracksTypes} from '../types';
import mongoose from 'mongoose';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import role from '../middleware/role';

const tracksRouter = express.Router();

tracksRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).send({error: 'User not authenticated'});
    }

    const trackData: TracksTypes = {
      user: req.user?._id,
      album: req.body.album,
      title: req.body.title,
      duration: req.body.duration,
      trackNumber: parseFloat(req.body.trackNumber),
      youTubeLink: req.body.youTubeLink ? req.body.youTubeLink : null,
    };

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

tracksRouter.get('/', role , async (req:RequestWithUser, res, next) => {
  try {
    let tracks;
    const tracksId = req.query.album as string;

    if (req.user) {
      if (tracksId) {
        if (req.user.role === 'admin') {
          tracks = await Track.find({album: tracksId}).populate('album').sort({trackNumber: 1});
        } else if (req.user.role === 'user') {
          tracks = await Track.find({album: tracksId, $or: [{isPublished: true}, {user: req.user._id, isPublished: false}]}).populate('album').sort({trackNumber: 1});
        } else {
          tracks = await Track.find({album: tracksId, isPublished: true}).populate('album').sort({trackNumber: 1});
        }
      } else {
        if (req.user.role === 'admin') {
          tracks = await Track.find({}).sort({trackNumber: 1});
        } else if (req.user.role === 'user') {
          tracks = await Track.find({$or: [{isPublished: true}, {user: req.user._id, isPublished: false}]}).sort({trackNumber: 1});
        } else {
          tracks = await Track.find({isPublished: true}).sort({trackNumber: 1});
        }
      }
    } else {
      tracks = await Track.find({album: tracksId, isPublished: true}).populate('album').sort({trackNumber: 1});
    }

    return res.send(tracks);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;

    const track = await Track.findById({_id: id});

    if (!track) {
      return res.status(404).send({error: 'Track not found'});
    }

    track.isPublished = !track.isPublished;

    await track.save();
    return res.send(track);
  } catch (error) {
    return next(error);
  }
});

tracksRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user?._id;

    if (req.user) {
      if (req.user?.role === 'admin') {
        await Track.findByIdAndDelete(id);
        return res.send({message: 'Track was deleted by admin'});
      } else if (req.user?.role === 'user') {
        await Track.findOneAndDelete({_id: id, user: userId, isPublished: false});
        return res.send({message: 'Track was deleted by user'});
      }
    } else {
      return res.status(403).send({error: 'Forbidden! You have no rights to delete!'});
    }

  } catch (error) {
    return next(error);
  }
});

export default tracksRouter;