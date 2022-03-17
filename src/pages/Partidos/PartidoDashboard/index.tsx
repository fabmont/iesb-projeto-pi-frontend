import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';

const PartidoDashboard: React.FC = () => {
  return (
    <Box h="full" mt={4}>
      <h1>Partido Dashboard</h1>
    </Box>
  );
};

export default () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <PartidoDashboard />
      </Suspense>
    </Layout>
  );
};
