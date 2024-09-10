import express from 'express';
import Artist from '../models/Artist';
import mongoose from 'mongoose';
import {ArtistTypes} from '../types';
import {imagesUpload} from '../multer';

const artistsRouter = express.Router();

artistsRouter.get('/', async (_, res, next) => {
  try {
    const artists = await Artist.find();

    if (artists.length === 0) {
      return res.status(404).send({error: 'The list of artists is empty!'});
    }
    return res.send(artists);
  } catch (error) {
    return next(error);
  }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const artistData: ArtistTypes = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      information: req.body.information,
    }

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

export default artistsRouter;