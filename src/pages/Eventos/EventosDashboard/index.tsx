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
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { MultiValue, Select } from 'chakra-react-select';
import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import {
  useEventos,
  useSituacoesEvento,
  useTiposEvento,
} from '../../../services/fetchers/eventos';
import truncateText from '../../../helpers/truncateString';

const EventoDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');
  const [selectedSituacoes, setSelectedSituacoes] = useState<string[]>([]);
  const [selectedTiposEvento, setSelectedTiposEvento] = useState<string[]>([]);
  const { data: eventosData, refetch } = useEventos(
    {
      dataInicio: dataInicio || undefined,
      dataFim: dataFim || undefined,
      codSituacao: selectedSituacoes.join(',') || undefined,
      codTipoEvento: selectedTiposEvento.join(',') || undefined,
      pagina: currentPage,
      itens: 15,
      ordenarPor: 'dataHoraInicio',
      ordem: 'desc',
    },
    { enabled: false },
  );
  const { data: situacoesEventoData } = useSituacoesEvento();
  const { data: tiposEventoData } = useTiposEvento();
  const eventos = eventosData?.dados;
  const situacoes = situacoesEventoData?.dados;
  const tiposEvento = tiposEventoData?.dados;

  useEffect(() => {
    refetch();
  }, [
    currentPage,
    dataInicio,
    dataFim,
    selectedSituacoes,
    selectedTiposEvento,
  ]);

  const paginateNext = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const paginatePrevious = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, []);

  return (
    <Box h="full" mt={4}>
      <Heading size="lg">Eventos</Heading>

      <Stack my={4} spacing={4} direction={['column', 'column', 'row']}>
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
        <Box w="full">
          <FormControl>
            <FormLabel>&nbsp;</FormLabel>
            <Select
              placeholder="Situação"
              isMulti
              isClearable
              options={situacoes?.map((i) => ({ value: i.cod, label: i.nome }))}
              onChange={(e: MultiValue<{ label: string; value: string }>) =>
                setSelectedSituacoes(e.map((i) => i.value))
              }
            />
          </FormControl>
        </Box>
        <Box w="full">
          <FormControl>
            <FormLabel>&nbsp;</FormLabel>
            <Select
              placeholder="Tipo de evento"
              isMulti
              isClearable
              options={tiposEvento?.map((i) => ({
                value: i.cod,
                label: i.nome,
              }))}
              onChange={(e: MultiValue<{ label: string; value: string }>) =>
                setSelectedTiposEvento(e.map((i) => i.value))
              }
            />
          </FormControl>
        </Box>
      </Stack>

      <Box borderWidth="1px" borderRadius="lg" mt={8} overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th>Nome</Th>
              <Th>Início</Th>
              <Th>Fim</Th>
              <Th>Situação</Th>
            </Tr>
          </Thead>
          <Tbody>
            {eventos?.map((evento) => (
              <Tr key={evento.id}>
                <Td maxW="500px">
                  <ChakraLink
                    as={Link}
                    to={`/eventos/${evento.id}`}
                    color={useColorModeValue('blue.500', 'blue.200')}
                    fontWeight="bold"
                    title={evento.descricao}
                  >
                    {truncateText(evento.descricao, 100)}
                  </ChakraLink>
                </Td>
                <Td>
                  {moment(evento.dataHoraInicio).format('DD/MM/YYYY • HH:mm')}
                </Td>
                <Td>
                  {evento.dataHoraFim
                    ? moment(evento.dataHoraFim).format('DD/MM/YYYY • HH:mm')
                    : '--'}
                </Td>
                <Td>
                  <Tag>{evento.situacao}</Tag>
                </Td>
              </Tr>
            ))}
            {!eventos?.length && (
              <Tr>
                <Td colSpan={4} textAlign="center">
                  Nenhum evento encontrado.
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
        <EventoDashboard />
      </Suspense>
    </Layout>
  );
};
