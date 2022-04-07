import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  Icon,
  Img,
  Stack,
  Text,
  useColorModeValue,
  Link as ChakraLink,
  Center,
  Tag,
  Avatar,
} from '@chakra-ui/react';
import { Suspense } from 'react';
import { FaFacebook, FaLink } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../../components/Layout';
import LoadingSpinner from '../../../components/LoadingSpinner';
import capitalizeString from '../../../helpers/capitalizeString';
import truncateText from '../../../helpers/truncateString';
import { usePartido } from '../../../services/fetchers/partidos';

const PartidoDetails: React.FC = () => {
  const { id: partidoID } = useParams();
  const { data } = usePartido(partidoID);

  return (
    <Box h="full" mt={4}>
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
          <BreadcrumbLink as={Link} to="/partidos">
            Partidos
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink title={data?.dados?.nome}>
            {truncateText(data?.dados?.nome ?? '', 30)}
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
          <Stack
            align={['center', 'baseline']}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Img src={data?.dados?.urlLogo} w="44" borderRadius="lg" />
          </Stack>
          <Stack py={4} flex="1" justifyContent="space-between">
            <Box>
              <Heading size="lg" textAlign={['center', 'unset']}>
                {data?.dados?.nome}&nbsp;
                <Text as="span" fontWeight="normal" opacity={0.6}>
                  ({data?.dados?.sigla})
                </Text>
              </Heading>
            </Box>

            <Box pt={8}>
              <Button
                as={ChakraLink}
                variant="link"
                disabled={!data?.dados?.urlFacebook}
                href={data?.dados?.urlFacebook}
                isExternal
                mr={2}
              >
                <Icon as={FaFacebook} mr={2} fontSize="2xl" color="blue.500" />
              </Button>
              <Button
                as={ChakraLink}
                variant="link"
                disabled={!data?.dados?.urlWebSite}
                href={data?.dados?.urlWebSite}
                isExternal
              >
                <Icon as={FaLink} mr={2} fontSize="2xl" color="gray.500" />
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Stack mt={4} direction={['column', 'column', 'row']}>
        <Center
          w="full"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          bg={useColorModeValue('gray.100', 'gray.900')}
          flexDirection="column"
        >
          <Heading size="md">Situação</Heading>
          <Tag
            mt={4}
            size="lg"
            colorScheme={
              data?.dados?.status.situacao === 'Extinto' ? 'red' : 'blue'
            }
          >
            {data?.dados.status.situacao}
          </Tag>
        </Center>
        <Center
          w="full"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          bg={useColorModeValue('gray.100', 'gray.900')}
          flexDirection="column"
        >
          <Heading size="md">Total de membros</Heading>
          <Tag mt={4} size="lg" colorScheme="blue">
            {data?.dados.status.totalMembros}
          </Tag>
        </Center>
        <Center
          w="full"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          bg={useColorModeValue('gray.100', 'gray.900')}
          flexDirection="column"
        >
          <Heading size="md">Total de posse</Heading>
          <Tag mt={4} size="lg" colorScheme="blue">
            {data?.dados.status.totalPosse}
          </Tag>
        </Center>
      </Stack>

      {data?.dados.status.lider.nome && (
        <>
          <Heading size="md" my={4}>
            Líder
          </Heading>
          <Button
            variant="unstyled"
            as={Link}
            to={`/deputados/${
              data?.dados.status.lider.uri.split('/deputados/')[1]
            }`}
          >
            <Stack direction="row">
              <Avatar src={data?.dados.status.lider.urlFoto} size="lg" mr={4} />
              <Box display="flex" alignItems="center" whiteSpace="pre-line">
                {capitalizeString(data?.dados.status.lider.nome)}
              </Box>
            </Stack>
          </Button>
        </>
      )}
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
