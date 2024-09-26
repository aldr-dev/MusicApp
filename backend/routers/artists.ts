import express from 'express';
import Artist from '../models/Artist';
import mongoose from 'mongoose';
import {ArtistMutation, ArtistTypes} from '../types';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import role from '../middleware/role';

const artistsRouter = express.Router();

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).send({error: 'User not authenticated'});
    }

    const artistData: ArtistTypes = {
      user: req.user?._id,
      name: req.body.name,
      information: req.body.information,
      image: req.file ? req.file.filename : null,
    };

    const artist = new Artist(artistData);
    await artist.save();
    return res.send(artist);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

artistsRouter.get('/', role, async (req: RequestWithUser, res, next) => {
  try {
    let artists: ArtistMutation[] = [];

    if (req.user) {
      if (req.user?.role === 'admin') {
        artists = await Artist.find({}, {user: 0});
      }
      if (req.user?.role === 'user') {
        artists = await Artist.find({ $or: [{ isPublished: true }, { user: req.user._id, isPublished: false }] }, { user: 0 });
      }
    } else {
      artists = await Artist.find({ isPublished: true }, { user: 0 });
    }

    return res.send(artists);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const artist = await Artist.findOne({_id: req.params.id});

    if (!artist) {
      return res.status(404).send({error: 'Unable to retrieve artist!'});
    }

    return res.send(artist);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;

    const artist = await Artist.findById({_id: id});

    if (!artist) {
      return res.status(404).send({error: 'Artist not found'});
    }

    artist.isPublished = !artist.isPublished;

    await artist.save();
    return res.send(artist);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user?._id;

    if (req.user) {
      if (req.user?.role === 'admin') {
        await Artist.findByIdAndDelete(id);
        return res.send({message: 'Artist was deleted by admin'});
      } else if (req.user?.role === 'user') {
        await Artist.findOneAndDelete({_id: id, user: userId, isPublished: false});
        return res.send({message: 'Artist was deleted by user'});
      }
    } else {
      return res.status(403).send({error: 'Forbidden! You have no rights to delete!'});
    }

  } catch (error) {
    return next(error);
  }
});

export default artistsRouter;