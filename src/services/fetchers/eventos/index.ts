import useSWR from 'swr';
import api from '../../api';

interface IDetalheEvento {
  dataHoraFim?: string;
  dataHoraInicio: string;
  descricao: string;
  descricaoTipo: string;
  id: 0;
  localCamara: {
    andar: string;
    nome: string;
    predio: string;
    sala: string;
  };
  localExterno?: string;
  orgaos: [
    {
      apelido: string;
      codTipoOrgao: 0;
      id: 0;
      nome: string;
      nomePublicacao: string;
      sigla: string;
      tipoOrgao: string;
      uri: string;
    },
  ];
  situacao: string;
  uri: string;
  urlRegistro: string;
}

interface ILinksEvento {
  href: string;
  rel: string;
}

interface IEventoResponse {
  dados: IDetalheEvento[];
  links: ILinksEvento[];
}

export const fetchEventos = async (url: string) => {
  const { data } = await api.get<IEventoResponse>(url);

  return data;
};

export const useEventos = () => {
  const swrData = useSWR('/eventos', fetchEventos, { suspense: true });

  return swrData;
};
