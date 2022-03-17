import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Heading,
  Img,
  SimpleGrid,
  Skeleton,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import shuffle from 'lodash.shuffle';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDeputados } from '../../services/fetchers/deputados';

export const DeputadosListLoading = () => {
  return (
    <SimpleGrid columns={[1, 2, 4]} spacing={4}>
      <Skeleton height="64" />
      <Skeleton height="64" />
      <Skeleton height="64" />
      <Skeleton height="64" />
    </SimpleGrid>
  );
};

const EventosList: React.FC = () => {
  const { data } = useDeputados();
  const displayPartidos = useMemo(
    () => shuffle(data?.dados).slice(0, 4),
    [data?.dados],
  );

  return (
    <>
      <SimpleGrid columns={[1, 3, 4]} spacing={4}>
        {displayPartidos?.map((item) => {
          return (
            <Box
              as={Link}
              to={`/deputados/${item.id}`}
              key={item.id}
              borderRadius="lg"
              borderWidth="1px"
              bg={useColorModeValue('gray.100', 'gray.900')}
              overflow="hidden"
            >
              <Img
                src={item.urlFoto}
                alt={item.nome}
                width="full"
                loading="lazy"
              />
              <Box p="4">
                <Stack direction="row" pb="2">
                  <Badge colorScheme="green">{item.siglaPartido}</Badge>
                  <Badge colorScheme="cyan">{item.siglaUf}</Badge>
                </Stack>
                <Heading fontSize="lg">{item.nome}</Heading>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>

      <Box mt="4" textAlign="right">
        <Button
          as={Link}
          to="/deputados"
          aria-label="see-more-partidos"
          colorScheme="blue"
          variant="ghost"
          rightIcon={<ArrowForwardIcon />}
        >
          Ver mais
        </Button>
      </Box>
    </>
  );
};

export default EventosList;
