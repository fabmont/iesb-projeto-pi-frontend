import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PartidoDetails: React.FC = () => {
  return (
    <Box h="full" mt={4}>
      <h1>Partido Details</h1>
    </Box>
  );
};

export default () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <PartidoDetails />
      </Suspense>
    </Layout>
  );
};
