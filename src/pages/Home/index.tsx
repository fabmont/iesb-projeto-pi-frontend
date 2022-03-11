import { Suspense } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import EventosList, { EventoListLoading } from '../../components/EventosList';
import PartidosList, {
  PartidosListLoading,
} from '../../components/PartidosList';
import DeputadosList, {
  DeputadosListLoading,
} from '../../components/DeputadosList';

const Home: React.FC = () => {
  return (
    <Layout>
      <Box h="full">
        <Box as="section" pt="4">
          <Heading size="lg" mb="4">
            Eventos
          </Heading>
          <Suspense fallback={<EventoListLoading />}>
            <EventosList />
          </Suspense>
        </Box>

        <Box as="section" pt="4">
          <Heading size="lg" mb="4">
            Partidos
          </Heading>
          <Suspense fallback={<PartidosListLoading />}>
            <PartidosList />
          </Suspense>
        </Box>

        <Box as="section" pt="4" pb={16}>
          <Heading size="lg" mb="4">
            Deputados
          </Heading>
          <Suspense fallback={<DeputadosListLoading />}>
            <DeputadosList />
          </Suspense>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
