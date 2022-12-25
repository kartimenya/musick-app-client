import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import Tracks from '../../components/screens/Tracks';

const index: NextPage = () => {
  return (
    <Layout>
      <Tracks />
    </Layout>
  );
};

export default index;
