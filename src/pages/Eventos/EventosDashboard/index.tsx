import { Box } from '@chakra-ui/react';
import { Suspense } from 'react';
import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';

const EventoDashboard: React.FC = () => {
  return (
    <Box h="full" mt={4}>
      <h1>Evento dashboard</h1>
    </Box>
  );
};

export default () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <EventoDashboard />
      </Suspense>
    </Layout>
  );
};
