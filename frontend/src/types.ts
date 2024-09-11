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