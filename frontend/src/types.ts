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