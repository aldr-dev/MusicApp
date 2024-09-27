import express from 'express';
import Album from '../models/Album';
import {imagesUpload} from '../multer';
import {AlbumsTypes} from '../types';
import mongoose from 'mongoose';
import Track from '../models/Track';
import auth, {RequestWithUser} from '../middleware/auth';
import permit from '../middleware/permit';
import role from '../middleware/role';

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
      dataRelease: parseFloat(req.body.dataRelease),
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

albumsRouter.get('/', role, async (req: RequestWithUser, res, next) => {
  try {
    let albums;
    const artistId = req.query.artist as string;

    if (req.user) {
      if (artistId) {
        if (req.user.role === 'admin') {
          albums = await Album.find({artist: artistId}, {user: 0}).populate('artist').sort({dataRelease: -1});
        } else if (req.user.role === 'user') {
          albums = await Album.find({artist: artistId, $or: [{isPublished: true}, {user: req.user._id, isPublished: false}]}, {user: 0}).populate('artist').sort({dataRelease: -1});
        } else {
          albums = await Album.find({artist: artistId, isPublished: true}, {user: 0}).populate('artist').sort({dataRelease: -1});
        }
      } else {
        if (req.user.role === 'admin') {
          albums = await Album.find({}, {user: 0}).sort({dataRelease: -1});
        } else if (req.user.role === 'user') {
          albums = await Album.find({$or: [{isPublished: true}, {user: req.user._id, isPublished: false}]}, {user: 0}).sort({dataRelease: -1});
        } else {
          albums = await Album.find({isPublished: true}, {user: 0}).populate('artist').sort({dataRelease: -1});
        }
      }
    } else {
      albums = await Album.find({artist: artistId, isPublished: true}, {user: 0}).sort({dataRelease: -1});
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

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const id = req.params.id;

    const album = await Album.findById({_id: id});

    if (!album) {
      return res.status(404).send({error: 'Album not found'});
    }

    album.isPublished = !album.isPublished;

    await album.save();
    return res.send(album);
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