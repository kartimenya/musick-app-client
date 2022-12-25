export interface IComent {
  _id: string;
  userName: string;
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
  coments: IComent[];
}
