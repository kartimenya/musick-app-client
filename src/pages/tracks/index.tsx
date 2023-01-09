import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import Tracks from '../../components/screens/Tracks';
import { ITrack } from '../../models/track';
import { fetchTracks } from '../../store/slices/track';
import { wrapper } from '../../store/store';

const index: NextPage = () => {
  return (
    <Layout title="Музыкальное приложение - Список треков">
      <Tracks />
    </Layout>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // const { data } = await axios.get<ITrack>('http://localhost:5000/tracks/' + params?.id);

  return {
    props: {},
  };
};
