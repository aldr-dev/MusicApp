export interface ArtistsTypes {
  _id: string;
  name: string;
  image: string | null;
  information: string;
}

export interface AlbumsTypes {
  _id: string;
  artist: ArtistsTypes;
  title: string;
  dataRelease: number,
  image: string | null;
  trackCount: number;
}

export interface TracksTypes {
  _id: string;
  album: {
    _id: string;
    title: string;
    image: string | null;
    artist: string;
    dataRelease: number;
  };
  title: string;
  duration: string;
  trackNumber: number
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