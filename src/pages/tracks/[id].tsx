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

// не деплоит GetServerSideProps, только getStaticProps
export const getStaticProps: GetServerSideProps<{ serverTrack: ITrack }> = async ({ params }) => {
  const { data } = await axios.get<ITrack>('http://localhost:5000/tracks/' + params?.id);
  return {
    props: {
      serverTrack: data,
    },
  };
};
