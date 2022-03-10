import { ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Button,
  Heading,
  IconButton,
  Img,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import shuffle from 'lodash.shuffle';

const dados = [
  {
    id: 204554,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204554',
    nome: 'Abílio Santana',
    siglaPartido: 'PL',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37906',
    siglaUf: 'BA',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204554.jpg',
    email: 'dep.abiliosantana@camara.leg.br',
  },
  {
    id: 204521,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204521',
    nome: 'Abou Anni',
    siglaPartido: 'UNIÃO',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/38009',
    siglaUf: 'SP',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204521.jpg',
    email: 'dep.abouanni@camara.leg.br',
  },
  {
    id: 204379,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204379',
    nome: 'Acácio Favacho',
    siglaPartido: 'PROS',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36763',
    siglaUf: 'AP',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204379.jpg',
    email: 'dep.acaciofavacho@camara.leg.br',
  },
  {
    id: 204560,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204560',
    nome: 'Adolfo Viana',
    siglaPartido: 'PSDB',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36835',
    siglaUf: 'BA',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204560.jpg',
    email: 'dep.adolfoviana@camara.leg.br',
  },
  {
    id: 204528,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204528',
    nome: 'Adriana Ventura',
    siglaPartido: 'NOVO',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37901',
    siglaUf: 'SP',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204528.jpg',
    email: 'dep.adrianaventura@camara.leg.br',
  },
  {
    id: 121948,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/121948',
    nome: 'Adriano do Baldy',
    siglaPartido: 'PP',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37903',
    siglaUf: 'GO',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/121948.jpg',
    email: 'dep.adrianodobaldy@camara.leg.br',
  },
  {
    id: 74646,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/74646',
    nome: 'Aécio Neves',
    siglaPartido: 'PSDB',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36835',
    siglaUf: 'MG',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/74646.jpg',
    email: 'dep.aecioneves@camara.leg.br',
  },
  {
    id: 141372,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/141372',
    nome: 'Aelton Freitas',
    siglaPartido: 'PL',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37906',
    siglaUf: 'MG',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/141372.jpg',
    email: 'dep.aeltonfreitas@camara.leg.br',
  },
  {
    id: 160508,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/160508',
    nome: 'Afonso Florence',
    siglaPartido: 'PT',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36844',
    siglaUf: 'BA',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/160508.jpg',
    email: 'dep.afonsoflorence@camara.leg.br',
  },
  {
    id: 136811,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/136811',
    nome: 'Afonso Hamm',
    siglaPartido: 'PP',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37903',
    siglaUf: 'RS',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/136811.jpg',
    email: 'dep.afonsohamm@camara.leg.br',
  },
  {
    id: 178835,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/178835',
    nome: 'Afonso Motta',
    siglaPartido: 'PDT',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36786',
    siglaUf: 'RS',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/178835.jpg',
    email: 'dep.afonsomotta@camara.leg.br',
  },
  {
    id: 160527,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/160527',
    nome: 'Aguinaldo Ribeiro',
    siglaPartido: 'PP',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37903',
    siglaUf: 'PB',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/160527.jpg',
    email: 'dep.aguinaldoribeiro@camara.leg.br',
  },
  {
    id: 204495,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204495',
    nome: 'Airton Faleiro',
    siglaPartido: 'PT',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36844',
    siglaUf: 'PA',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204495.jpg',
    email: 'dep.airtonfaleiro@camara.leg.br',
  },
  {
    id: 204549,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204549',
    nome: 'AJ Albuquerque',
    siglaPartido: 'PP',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37903',
    siglaUf: 'CE',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204549.jpg',
    email: 'dep.ajalbuquerque@camara.leg.br',
  },
  {
    id: 178836,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/178836',
    nome: 'Alan Rick',
    siglaPartido: 'UNIÃO',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/38009',
    siglaUf: 'AC',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/178836.jpg',
    email: 'dep.alanrick@camara.leg.br',
  },
  {
    id: 160559,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/160559',
    nome: 'Alceu Moreira',
    siglaPartido: 'MDB',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/36899',
    siglaUf: 'RS',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/160559.jpg',
    email: 'dep.alceumoreira@camara.leg.br',
  },
  {
    id: 204413,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204413',
    nome: 'Alcides Rodrigues',
    siglaPartido: 'PATRIOTA',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37907',
    siglaUf: 'GO',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204413.jpg',
    email: 'dep.alcidesrodrigues@camara.leg.br',
  },
  {
    id: 204545,
    uri: 'https://dadosabertos.camara.leg.br/api/v2/deputados/204545',
    nome: 'Alê Silva',
    siglaPartido: 'REPUBLICANOS',
    uriPartido: 'https://dadosabertos.camara.leg.br/api/v2/partidos/37908',
    siglaUf: 'MG',
    idLegislatura: 56,
    urlFoto: 'https://www.camara.leg.br/internet/deputado/bandep/204545.jpg',
    email: 'dep.alesilva@camara.leg.br',
  },
];

const EventosList: React.FC = () => {
  const displayPartidos = dados.slice(0, 4);

  return (
    <>
      <SimpleGrid columns={[1, 3, 4]} spacing={4}>
        {displayPartidos.map((item) => {
          return (
            <Box
              key={item.id}
              borderRadius="lg"
              borderWidth="1px"
              bg={useColorModeValue('gray.100', 'gray.900')}
              overflow="hidden"
            >
              <Img src={item.urlFoto} alt={item.nome} width="full" />
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
