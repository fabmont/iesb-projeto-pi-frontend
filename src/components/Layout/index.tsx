import React from 'react';
import { Box, Container } from '@chakra-ui/react';
import Header from '../Header';

const Layout: React.FC = ({ children }) => {
  return (
    <Box as="main" minH="full" h="full">
      <Header />
      <Container maxW="container.xl" pt={16} h="full">
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
