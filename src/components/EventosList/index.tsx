import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useEventos } from '../../services/fetchers/eventos';

export const EventoListLoading = () => {
  return (
    <SimpleGrid columns={[1, 1, 2]} spacing={4}>
      <Skeleton height="24" />
      <Skeleton height="24" />
      <Skeleton height="24" />
      <Skeleton height="24" />
    </SimpleGrid>
  );
};

const EventosList: React.FC = () => {
  const { data } = useEventos();
  const displayPartidos = data?.dados.slice(0, 4);

  return (
    <>
      <SimpleGrid columns={[1, 1, 2]} spacing={4}>
        {displayPartidos?.map((item) => {
          const startDate = new Date(item.dataHoraInicio);
          const endDate = item.dataHoraFim && new Date(item.dataHoraFim);
          const formattedStartDate = new Intl.DateTimeFormat('pt-BR').format(
            startDate,
          );
          const formattedEndtDate =
            endDate && new Intl.DateTimeFormat('pt-BR').format(endDate);

          return (
            <Box
              as={Link}
              to={`/eventos/${item.id}`}
              key={item.id}
              p="4"
              borderRadius="lg"
              borderWidth="1px"
              bg={useColorModeValue('gray.100', 'gray.900')}
            >
              <Stack direction="row" mb="2">
                {item.orgaos.map((orgao) => (
                  <Badge key={orgao.id} colorScheme="green">
                    {orgao.sigla}
                  </Badge>
                ))}
              </Stack>
              <Text fontWeight="bold" mb="2">
                {item.descricao}
              </Text>
              <Text fontSize="sm" opacity={0.6}>
                {formattedStartDate}{' '}
                {!!formattedEndtDate && ` - ${formattedEndtDate}`}
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>

      <Box mt="4" textAlign="right">
        <Button
          as={Link}
          to="/eventos"
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
