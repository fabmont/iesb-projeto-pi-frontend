import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Img,
  SimpleGrid,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import shuffle from 'lodash.shuffle';

const dados = [
  {
    id: 36898,
    sigla: 'AVANTE',
    nome: 'Avante',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36898',
  },
  {
    id: 37905,
    sigla: 'CIDADANIA',
    nome: 'Cidadania',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37905',
  },
  {
    id: 37902,
    sigla: 'DC',
    nome: 'Democracia Cristã',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37902',
  },
  {
    id: 36769,
    sigla: 'DEM',
    nome: 'Democratas',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36769',
  },
  {
    id: 36899,
    sigla: 'MDB',
    nome: 'Movimento Democrático Brasileiro',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36899',
  },
  {
    id: 37901,
    sigla: 'NOVO',
    nome: 'Partido Novo',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37901',
  },
  {
    id: 37900,
    sigla: 'PATRI',
    nome: 'Patriota',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37900',
  },
  {
    id: 37907,
    sigla: 'PATRIOTA',
    nome: 'Patriota',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37907',
  },
  {
    id: 36863,
    sigla: 'PCB',
    nome: 'Partido Constitucionalista Brasileiro',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36863',
  },
  {
    id: 36779,
    sigla: 'PCdoB',
    nome: 'Partido Comunista do Brasil',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36779',
  },
  {
    id: 36781,
    sigla: 'PCO',
    nome: 'Partido da Causa Operária',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36781',
  },
  {
    id: 36786,
    sigla: 'PDT',
    nome: 'Partido Democrático Trabalhista',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36786',
  },
  {
    id: 36793,
    sigla: 'PHS',
    nome: 'Partido Humanista da Solidariedade',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36793',
  },
  {
    id: 37906,
    sigla: 'PL',
    nome: 'Partido Liberal',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37906',
  },
  {
    id: 36887,
    sigla: 'PMB',
    nome: 'Partido da Mulher Brasileira',
    uri: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36887',
  },
];

const PartidosList: React.FC = () => {
  const displayPartidos = shuffle(dados).slice(0, 4);

  return (
    <>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        {displayPartidos.map((item) => (
          <Box
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
