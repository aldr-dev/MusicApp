import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import {AlbumsTypes} from '../types';
import mongoose from 'mongoose';
import Track from '../models/Track';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let albums;
    const artistId = req.query.artist as string;

    if (artistId) {
      albums = await Album.find({artist: artistId}).populate('artist').sort({ dataRelease: -1 });
    } else {
      albums = await Album.find().sort({ dataRelease: -1 });
    }

    const albumPromises = albums.map(async (album) => {
      const trackCount = await Track.countDocuments({ album: album._id });
      return {
        ...album.toObject(),
        trackCount
      };
    });

    const albumsWithTrackCount = await Promise.all(albumPromises);
    return res.send(albumsWithTrackCount);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
   const id = req.params.id as string;

   const findInfoAlbum = await Album.findById(id).populate('artist');

   if (findInfoAlbum === null) {
     return res.status(404).send({error: 'Unable to retrieve album information including artist!'});
   }

   return res.send(findInfoAlbum);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    const albumData: AlbumsTypes = {
      artist: req.body.artist,
      title: req.body.title,
      dataRelease: req.body.dataRelease,
      image: req.file ? req.file.filename : null,
    }

    const album = new Album(albumData);
    await album.save();
    return res.send(album);

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});


export default albumsRouter;