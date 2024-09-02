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