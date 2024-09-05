import mongoose, {Model} from 'mongoose';

export interface ArtistTypes {
  name: string;
  image: string | null;
  information: string;
}

export interface AlbumsTypes {
  artist: string,
  title: string,
  dataRelease: string,
  image: string | null,
}

export interface TracksTypes {
  album: string,
  title: string,
  duration: string,
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface AlbumFields {
  artist: mongoose.Types.ObjectId;
  title: string;
  dataRelease: string;
  image?: string | null;
}

export interface ArtistFields {
  name: string;
  image?: string | null;
  information?: string;
}

export interface TrackFields {
  album: mongoose.Types.ObjectId;
  title: string;
  duration: string;
}

export interface TrackHistoryFields {
  user: mongoose.Types.ObjectId;
  track: mongoose.Types.ObjectId;
  datetime: Date;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;




