import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  SimpleGrid,
  Skeleton,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import shuffle from 'lodash.shuffle';
import { Link } from 'react-router-dom';
import { usePartidos } from '../../services/fetchers/partidos';

export const PartidosListLoading = () => {
  return (
    <SimpleGrid columns={[1, 2, 4]} spacing={4}>
      <Skeleton height="24" />
      <Skeleton height="24" />
      <Skeleton height="24" />
      <Skeleton height="24" />
    </SimpleGrid>
  );
};

const PartidosList: React.FC = () => {
  const { data } = usePartidos();
  const displayPartidos = shuffle(data?.dados).slice(0, 4);

  return (
    <>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        {displayPartidos.map((item) => (
          <Box
            as={Link}
            to={`/partidos/${item.id}`}
            key={item.id}
            p="4"
            borderRadius="lg"
            borderWidth="1px"
            bg={useColorModeValue('gray.100', 'gray.900')}
          >
            <Text fontSize="smaller">{item.sigla}</Text>
            <Text fontSize="sm" fontWeight="bold">
              {item.nome}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
      <Box mt="4" textAlign="right">
        <Button
          as={Link}
          to="/partidos"
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

export default PartidosList;
