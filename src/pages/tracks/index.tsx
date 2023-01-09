import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import Tracks from '../../components/screens/Tracks';
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

export const getStaticProps: GetServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchTracks());
    return {
      props: {},
    };
  },
);
