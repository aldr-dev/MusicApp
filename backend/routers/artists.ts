import express from 'express';
import Artist from '../models/Artist';
import mongoose from 'mongoose';
import {ArtistTypes} from '../types';
import {imagesUpload} from '../multer';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

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

artistsRouter.get('/', async (_, res, next) => {
  try {
    const artists = await Artist.find();

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