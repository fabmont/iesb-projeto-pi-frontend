import { useQuery } from 'react-query';
import api from '../../api';
import { IPartidoResponse, IPartidosResponse } from './index.types';

export const fetcher = async <T>(url: string) => {
  const { data } = await api.get<T>(url);

  return data;
};

export const usePartidos = () => {
  const queryData = useQuery('partidos', () =>
    fetcher<IPartidosResponse>('/partidos'),
  );

  return queryData;
};

export const usePartido = (partidoId?: string) => {
  const queryData = useQuery(`partidos/${partidoId}`, () =>
    fetcher<IPartidoResponse>(`/partidos/${partidoId}`),
  );

  return queryData;
};
