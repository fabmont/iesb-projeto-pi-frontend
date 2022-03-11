import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Tag,
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react';
import useSWR from 'swr';
import { ChevronRightIcon } from '@chakra-ui/icons';
import moment from 'moment';
import Layout from '../../../components/Layout';
import { useEvento } from '../../../services/fetchers/eventos';

const EventoDetails: React.FC = () => {
  const { id: eventoId } = useParams();
  const { data: eventoData } = useEvento(eventoId);
  const dados = eventoData?.dados;
  const { data: youtubeIframe } = useSWR(
    dados?.urlRegistro
      ? `https://www.youtube.com/oembed?url=${dados?.urlRegistro}`
      : null,
    (url) => fetch(url).then((res) => res.json()),
  );

  const handleSituationColor = () => {
    if (dados?.situacao === 'Encerrada') return 'red';

    return 'blue';
  };

  return (
    <Box h="full" mt="4">
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="blue.500" />}
        mb="4"
        colorScheme="blue"
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Início</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/eventos">Eventos</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{dados?.descricao.slice(0, 24)}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Tag colorScheme={handleSituationColor()} mb="2">
        {dados?.situacao}
      </Tag>
      <Heading mb="8">{dados?.descricao}</Heading>

      <Heading size="md" mb="4">
        Informações gerais
      </Heading>
      <Box borderWidth="1px" borderRadius="md" mb="6">
        <Table variant="simple" size="sm">
          <Tbody>
            <Tr>
              <Td fontWeight="bold">Órgãos:</Td>
              <Td>{dados?.orgaos.map((i) => i.sigla).join(', ') ?? '--'}</Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Início:</Td>
              <Td>
                {(dados?.dataHoraInicio &&
                  moment(dados?.dataHoraInicio).format('DD/MM/YYYY • HH:mm')) ??
                  '--'}
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Fim:</Td>
              <Td>
                {dados?.dataHoraFim
                  ? moment(dados?.dataHoraFim).format('DD/MM/YYYY • HH:mm')
                  : '--'}
              </Td>
            </Tr>
            <Tr>
              <Td fontWeight="bold">Local na Câmara:</Td>
              <Td>{dados?.localCamara.nome ?? '--'}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <Heading size="md" mb="4">
        Registro
      </Heading>
      <Box dangerouslySetInnerHTML={{ __html: youtubeIframe?.html }} />
    </Box>
  );
};

export default () => {
  return (
    <Suspense fallback="Loading...">
      <Layout>
        <EventoDetails />
      </Layout>
    </Suspense>
  );
};
