export interface IComent {
  _id: string;
  username: string;
  text: string;
}
export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComent[];
}
