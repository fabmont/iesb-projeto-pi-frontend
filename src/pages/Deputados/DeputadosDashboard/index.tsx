import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { AsyncSelect, MultiValue, Select } from 'chakra-react-select';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import _debounce from 'lodash.debounce';

import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import capitalizeString from '../../../helpers/capitalizeString';
import { useDeputados } from '../../../services/fetchers/deputados';
import { useUF } from '../../../services/fetchers/uf';
import api from '../../../services/api';
import { IPartidosDetails } from '../../../services/fetchers/partidos/index.types';

const DeputadosDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [deputadoNome, setDeputadoNome] = useState('');
  const [selectedUFS, setSelectedUFS] = useState<unknown>([]);
  const [selectedPartidos, setSelectedPartidos] = useState<unknown>([]);
  const { data: deputadosData, refetch } = useDeputados(
    {
      itens: 15,
      pagina: currentPage,
      siglaPartido: (selectedPartidos as string[])?.map((i) => i).join(','),
      siglaUf: (selectedUFS as string[])?.map((i) => i).join(','),
      nome: deputadoNome,
    },
    { enabled: false },
  );
  const { data: ufData } = useUF();
  const deputados = deputadosData?.dados;
  const ufs = ufData?.dados;

  useEffect(() => {
    refetch();
  }, [currentPage, selectedPartidos, selectedUFS]);

  const paginateNext = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const paginatePrevious = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, []);

  const fetchPartidos = async (
    inputVal: string,
    callback: (args: unknown[]) => void,
  ) => {
    const { data } = await api.get('/partidos', {
      params: { sigla: inputVal },
    });

    const options = data?.dados?.map((i: IPartidosDetails) => ({
      label: `${i.nome} (${i.sigla})`,
      value: i.sigla,
    }));

    callback(options);
  };

  const partidoDebounce = useCallback(_debounce(fetchPartidos, 1000), []);

  const nomeDeputadoDebounce = useCallback(_debounce(refetch, 1000), []);

  const handlePartidoChange = useCallback((val: string, callback) => {
    partidoDebounce(val, callback);
  }, []);

  const handleDeputadoNomeChange = useCallback((val: string) => {
    setDeputadoNome(val);
    nomeDeputadoDebounce();
  }, []);

  return (
    <Box h="full" mt={4}>
      <Heading size="lg">Deputados</Heading>

      <Stack my={4} spacing={4} direction={['column', 'column', 'row']}>
        <Box w="full">
          <Input
            placeholder="Pesquisar por nome"
            onChange={(e) => handleDeputadoNomeChange(e.target.value)}
            value={deputadoNome}
          />
        </Box>
        <Box w="full">
          <Select
            placeholder="Selecionar UFs..."
            options={ufs?.map((i) => ({
              label: `${capitalizeString(i.nome)} (${i.sigla})`,
              value: i.sigla,
            }))}
            isClearable
            isMulti
            onChange={(e: MultiValue<{ label: string; value: string }>) =>
              setSelectedUFS(e.map((i) => i.value))
            }
          />
        </Box>
        <Box w="full">
          <AsyncSelect
            placeholder="Selecionar partidos..."
            loadOptions={handlePartidoChange}
            onChange={(e: MultiValue<{ label: string; value: string }>) =>
              setSelectedPartidos(e.map((i) => i.value))
            }
            isMulti
            isClearable
          />
        </Box>
      </Stack>

      <Box borderWidth="1px" borderRadius="lg" mt={8} overflowX="auto">
        <Table>
          <Thead>
            <Tr>
              <Th width={50} />
              <Th>Nome</Th>
              <Th>UF</Th>
              <Th>Partido</Th>
              <Th>E-mail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {deputados?.map((dep) => (
              <Tr key={dep.id}>
                <Td>
                  <Avatar src={dep.urlFoto} size="sm" />
                </Td>
                <Td>
                  <Button
                    variant="link"
                    as={Link}
                    to={`/deputados/${dep.id}`}
                    colorScheme="blue"
                  >
                    {dep.nome}
                  </Button>
                </Td>
                <Td>{dep.siglaUf}</Td>
                <Td>{dep.siglaPartido}</Td>
                <Td>{dep.email}</Td>
              </Tr>
            ))}
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
          isDisabled={!deputadosData?.links?.find((i) => i.rel === 'next')}
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
        <DeputadosDashboard />
      </Suspense>
    </Layout>
  );
};
