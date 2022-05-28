import { useState, useEffect, useCallback, Suspense } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import _debounce from 'lodash.debounce';

import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { usePartidos } from '../../../services/fetchers/partidos';

const PartidoDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sigla, setSigla] = useState<string>('');
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');
  const { data: eventosData, refetch } = usePartidos(
    {
      sigla: sigla || '',
      dataInicio: dataInicio || undefined,
      dataFim: dataFim || undefined,
      pagina: currentPage,
      itens: 15,
      ordenarPor: 'sigla',
      ordem: 'desc',
    },
    { enabled: false },
  );
  const partidos = eventosData?.dados;

  useEffect(() => {
    refetch();
  }, [currentPage, dataInicio, dataFim]);

  const paginateNext = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const paginatePrevious = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, []);

  const partidoSiglaDebounce = useCallback(_debounce(refetch, 1000), []);

  const handlePartidoSiglaChange = useCallback((val: string) => {
    setSigla(val);
    partidoSiglaDebounce();
  }, []);

  return (
    <Box h="full" mt={4}>
      <Heading size="lg">Partidos</Heading>

      <Stack my={4} spacing={4} direction={['column', 'column', 'row']}>
        <Box w="full">
          <FormControl>
            <FormLabel>Sigla do partido</FormLabel>
            <Input onChange={(e) => handlePartidoSiglaChange(e.target.value)} />
          </FormControl>
        </Box>
        <Box w="full">
          <FormControl>
            <FormLabel>Data de início</FormLabel>
            <Input
              placeholder="Data de início"
              type="date"
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box w="full">
          <FormControl>
            <FormLabel>Data fim</FormLabel>
            <Input
              placeholder="Data fim"
              type="date"
              onChange={(e) => setDataFim(e.target.value)}
            />
          </FormControl>
        </Box>
      </Stack>

      <Box borderWidth="1px" borderRadius="lg" mt={8} overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Sigla</Th>
              <Th>Nome</Th>
            </Tr>
          </Thead>
          <Tbody>
            {partidos?.map((partido) => (
              <Tr key={partido.id}>
                <Td maxW="500px">
                  <ChakraLink
                    as={Link}
                    to={`/partidos/${partido.id}`}
                    color={useColorModeValue('blue.500', 'blue.200')}
                    fontWeight="bold"
                  >
                    {partido.sigla}
                  </ChakraLink>
                </Td>
                <Td>{partido.nome}</Td>
              </Tr>
            ))}
            {!partidos?.length && (
              <Tr>
                <Td colSpan={2} textAlign="center">
                  Nenhum partido encontrado.
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
      <Stack spacing={4} mt={6} direction="row" justify="center">
        <Button
          variant="outline"
          leftIcon={<ArrowBackIcon />}
          size="sm"
          isDisabled={currentPage <= 1}
          onClick={paginatePrevious}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          rightIcon={<ArrowForwardIcon />}
          size="sm"
          isDisabled={!eventosData?.links?.find((i) => i.rel === 'next')}
          onClick={paginateNext}
        >
          Próximo
        </Button>
      </Stack>
      <Box h="8" />
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
