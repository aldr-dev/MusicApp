import mongoose, {Model} from 'mongoose';

export interface ArtistTypes {
  user: mongoose.Types.ObjectId;
  name: string;
  image: string | null;
  information: string;
}

export interface AlbumsTypes {
  user: mongoose.Types.ObjectId;
  artist: string;
  title: string;
  dataRelease: number;
  image: string | null;
}

export interface TracksTypes {
  user: mongoose.Types.ObjectId;
  album: string;
  title: string;
  duration: string;
  trackNumber: number;
  youTubeLink: string | null;
}

export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
  avatar: string | null;
  displayName?: string;
  googleID?: string;
}

export interface AlbumFields {
  user: mongoose.Types.ObjectId;
  artist: mongoose.Types.ObjectId;
  title: string;
  dataRelease: number;
  image?: string | null;
  isPublished: boolean;
}

export interface ArtistFields {
  user: mongoose.Types.ObjectId;
  name: string;
  image?: string | null;
  information?: string;
  isPublished: boolean;
}

export interface TrackFields {
  user: mongoose.Types.ObjectId;
  album: mongoose.Types.ObjectId;
  title: string;
  duration: string;
  trackNumber: number;
  youTubeLink: string;
  isPublished: boolean;
}

export interface TrackHistoryFields {
  user: mongoose.Types.ObjectId;
  track: mongoose.Types.ObjectId;
  artist: mongoose.Types.ObjectId;
  datetime: Date;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;