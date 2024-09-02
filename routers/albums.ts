import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import {AlbumsTypes} from '../types';
import mongoose from 'mongoose';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let albums;
    const artistId = req.query.artist as string;

    if (artistId) {
      albums = await Album.find({artist: artistId}).populate('artist', 'name');
    } else {
      albums = await Album.find();
    }
    return res.send(albums);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
   const id = req.params.id;

   const findInfoAlbum = await Album.findById({_id: id}).populate('artist');
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