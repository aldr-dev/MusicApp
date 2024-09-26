export interface ArtistsTypes {
  _id: string;
  name: string;
  image: string | null;
  information: string;
  isPublished: boolean;
}

export interface AlbumsTypes {
  _id: string;
  artist: ArtistsTypes;
  title: string;
  dataRelease: number,
  image: string | null;
  trackCount: number;
  isPublished: boolean;
}

export interface TracksTypes {
  _id: string;
  album: {
    _id: string;
    title: string;
    image: string | null;
    artist: string;
    dataRelease: number;
    isPublished: boolean;
  };
  title: string;
  duration: string;
  trackNumber: number;
  youTubeLink: string;
  isPublished: boolean;
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface TrackHistoryTypes {
  _id: string;
  user: string;
  track: {
    _id: string;
    album: string;
    title: string;
    duration: string;
    trackNumber: number;
    isPublished: boolean;
  }
  artist: {
    _id: string;
    name: string;
  }
  datetime: Date;
}