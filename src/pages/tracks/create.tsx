import { NextPage } from 'next';
import React from 'react';
import Layout from '../../components/Layout';
import Create from '../../components/screens/Create';

const create: NextPage = () => {
  return (
    <Layout>
      <Create />
    </Layout>
  );
};

export default create;
