import React, { FC } from 'react';
import Navbar from './Navbar';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import Player from './Player';

type ILayout = {
  children?: React.ReactNode;
};

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>
        <Box mt={12}>{children}</Box>
      </Container>
      <Player />
    </>
  );
};

export default Layout;
