import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import {AlbumsTypes} from '../types';
import mongoose from 'mongoose';
import Track from '../models/Track';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';

const albumsRouter = express.Router();

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req: RequestWithUser, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(400).send({error: 'User not authenticated'});
    }

    const albumData: AlbumsTypes = {
      user: req.user?._id,
      artist: req.body.artist,
      title: req.body.title,
      dataRelease: req.body.dataRelease,
      image: req.file ? req.file.filename : null,
    };

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

albumsRouter.get('/', async (req, res, next) => {
  try {
    let albums;
    const artistId = req.query.artist as string;

    if (artistId) {
      albums = await Album.find({artist: artistId}).populate('artist').sort({dataRelease: -1});
    } else {
      albums = await Album.find().sort({dataRelease: -1});
    }

    const albumPromises = albums.map(async (album) => {
      const trackCount = await Track.countDocuments({album: album._id});
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

albumsRouter.delete('/:id', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user?._id;

    if (req.user) {
      if (req.user?.role === 'admin') {
        await Album.findByIdAndDelete(id);
        return res.send({message: 'Album was deleted by admin'});
      } else if (req.user?.role === 'user') {
        await Album.findOneAndDelete({_id: id, user: userId, isPublished: false});
        return res.send({message: 'Album was deleted by user'});
      }
    } else {
      return res.status(403).send({error: 'Forbidden! You have no rights to delete!'});
    }

  } catch (error) {
    return next(error);
  }
});

export default albumsRouter;