import React, { FC } from 'react';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import Player from './Player';
import Head from 'next/head';

type ILayout = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: FC<ILayout> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Музыкальное приложение'}</title>
      </Head>
      <Navbar />
      <Container>
        <Box mt={12} paddingBottom={6}>
          {children}
        </Box>
      </Container>
      <Player />
    </>
  );
};

export default Layout;
