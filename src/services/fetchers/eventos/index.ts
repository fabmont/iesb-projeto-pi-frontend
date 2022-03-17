import { useQuery } from 'react-query';
import api from '../../api';
import { IDeputadosResponse } from '../deputados/index.types';
import { IEventoResponse, IEventosResponse } from './index.types';

export const fetcher = async <T>(url: string) => {
  const { data } = await api.get<T>(url);

  return data;
};

export const useEventos = () => {
  const queryData = useQuery('eventos', () =>
    fetcher<IEventosResponse>('/eventos'),
  );

  return queryData;
};

export const useEvento = (eventoId?: string) => {
  const queryData = useQuery(`eventos/${eventoId}`, () =>
    fetcher<IEventoResponse>(`/eventos/${eventoId}`),
  );

  return queryData;
};

export const useDeputadosEvento = (eventoId?: string) => {
  const queryData = useQuery(`eventos/${eventoId}/deputados`, () =>
    fetcher<IDeputadosResponse>(`/eventos/${eventoId}/deputados`),
  );

  return queryData;
};
