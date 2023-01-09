import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import TrackScreen from '../../components/screens/TrackScreen';
import { ITrack } from '../../models/track';

interface ItrackPage {
  serverTrack: ITrack;
}

const trackPage: NextPage<ItrackPage> = ({ serverTrack }) => {
  return (
    <Layout title={`Музыкальное приложение - ${serverTrack.name}`}>
      <TrackScreen serverTrack={serverTrack} />
    </Layout>
  );
};

export default trackPage;

export const getServerSideProps: GetServerSideProps<{ serverTrack: ITrack }> = async ({
  params,
}) => {
  // const { data } = await axios.get<ITrack>('http://localhost:5000/tracks/' + params?.id);
  const track: ITrack = {
    _id: 'fd',
    artist: 'fd',
    audio: 'fds',
    comments: [],
    listens: 1,
    name: 'fd',
    picture: 'fdf',
    text: 'ds',
  };
  return {
    props: {
      serverTrack: track,
    },
  };
};
