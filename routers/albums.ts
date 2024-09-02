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
      if (albums.length === 0) {
        return res.status(404).send({error: 'Failed to get list of albums for specific artist!'});
      }
    } else {
      albums = await Album.find();
      if (albums.length === 0) {
        return res.status(404).send({error: 'Album list is empty!'});
      }
    }
    return res.send(albums);
  } catch (error) {
    return next(error);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
   const id = req.params.id as string;

   const findInfoAlbum = await Album.findById({_id: id}).populate('artist');

   if (!findInfoAlbum) {
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