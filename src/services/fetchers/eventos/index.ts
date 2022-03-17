import { useQuery } from 'react-query';
import api from '../../api';
import { IEventoResponse, IEventosResponse } from './index.types';

export const fetchEventos = async <T>(url: string) => {
  const { data } = await api.get<T>(url);

  return data;
};

export const useEventos = () => {
  const queryData = useQuery('eventos', () =>
    fetchEventos<IEventosResponse>('/eventos'),
  );

  return queryData;
};

export const useEvento = (eventoId?: string) => {
  const queryData = useQuery(`eventos/${eventoId}`, () =>
    fetchEventos<IEventoResponse>(`/eventos/${eventoId}`),
  );

  return queryData;
};
