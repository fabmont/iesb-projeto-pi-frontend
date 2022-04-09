import { Suspense } from 'react';
import { ChevronRightIcon, EmailIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Icon,
  Img,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Wrap,
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { FaMapPin } from 'react-icons/fa';

import moment from 'moment';
import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import capitalizeString from '../../../helpers/capitalizeString';
import formatCpf from '../../../helpers/formatCpf';
import { useDeputado } from '../../../services/fetchers/deputados';
import DespesaCard from '../../../components/DespesaCard';
import truncateText from '../../../helpers/truncateString';

const DeputadosDetails: React.FC = () => {
  const { id } = useParams();
  const { data } = useDeputado(id);

  return (
    <Box h="full" py={4}>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="blue.500" />}
        mb={4}
        colorScheme="blue"
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/">
            🏠
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={Link} to="/deputados">
            Deputados
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink title={data?.dados?.ultimoStatus?.nome}>
            {truncateText(data?.dados?.ultimoStatus?.nome ?? '', 30)}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Box
        w="full"
        borderWidth="1px"
        borderRadius="lg"
        p={4}
        bg={useColorModeValue('gray.100', 'gray.900')}
      >
        <Stack direction={['column', 'row']} spacing={8}>
          <Stack align={['center', 'baseline']}>
            <Img
              src={data?.dados?.ultimoStatus?.urlFoto}
              w="44"
              borderRadius="lg"
            />
          </Stack>
          <Stack py={4} flex="1" justifyContent="space-between">
            <Box>
              <Heading size="lg">
                {capitalizeString(data?.dados?.ultimoStatus?.nome)}
              </Heading>
              <Wrap mt={2}>
                <Tag colorScheme="blue" size="lg">
                  {data?.dados?.ultimoStatus?.siglaPartido}
                </Tag>
                <Tag colorScheme="teal" size="lg">
                  {data?.dados?.ultimoStatus?.condicaoEleitoral}
                </Tag>
              </Wrap>
            </Box>

            <Box>
              <Text>
                <EmailIcon mr={2} /> {data?.dados?.ultimoStatus?.email}
              </Text>
              <Text>
                <Icon as={FaMapPin} mr={2} mt={2} />{' '}
                {data?.dados?.ultimoStatus?.siglaUf}
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Stack direction={['column', 'column', 'row']} mt="2">
        <Stack w={['full', 'full', 'full', 'md']}>
          <Box
            w="full"
            borderWidth="1px"
            borderRadius="md"
            p={4}
            bg={useColorModeValue('gray.100', 'gray.900')}
          >
            <Heading size="md" mb="4">
              Informações pessoais
            </Heading>
            <Table size="sm" variant="unstyled">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">Nome civil:</Td>
                  <Td>{capitalizeString(data?.dados?.nomeCivil)}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">CPF:</Td>
                  <Td>{formatCpf(data?.dados?.cpf)}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Data de nascimento:</Td>
                  <Td>
                    {moment(data?.dados?.dataNascimento).format('DD/MM/YYYY')}
                    <br />({moment().diff(
                      data?.dados?.dataNascimento,
                      'years',
                    )}{' '}
                    anos)
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Local de nascimento:</Td>
                  <Td>
                    {formatCpf(data?.dados?.municipioNascimento)} (
                    {data?.dados?.ufNascimento})
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Escolaridade:</Td>
                  <Td>{data?.dados?.escolaridade}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Situação:</Td>
                  <Td>{data?.dados?.ultimoStatus?.situacao}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>

          <Box
            w="full"
            borderWidth="1px"
            borderRadius="md"
            p={4}
            bg={useColorModeValue('gray.100', 'gray.900')}
          >
            <Heading size="md" mb="4">
              Informações do gabinete
            </Heading>
            <Table size="sm" variant="unstyled">
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">Telefone:</Td>
                  <Td>
                    {data?.dados?.ultimoStatus?.gabinete?.telefone ?? '--'}
                  </Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Prédio:</Td>
                  <Td>{data?.dados?.ultimoStatus?.gabinete?.predio ?? '--'}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Andar:</Td>
                  <Td>{data?.dados?.ultimoStatus?.gabinete?.andar ?? '--'}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">Sala:</Td>
                  <Td>{data?.dados?.ultimoStatus?.gabinete?.sala ?? '--'}</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">E-mail:</Td>
                  <Td>{data?.dados?.ultimoStatus?.gabinete?.email ?? '--'}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Stack>

        <DespesaCard />
      </Stack>
      <Box h={4} />
    </Box>
  );
};

export default () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <DeputadosDetails />
      </Suspense>
    </Layout>
  );
};
