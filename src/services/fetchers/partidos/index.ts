import { useQuery } from 'react-query';
import api from '../../api';
import {
  IPartidoResponse,
  IPartidosParams,
  IPartidosResponse,
} from './index.types';

export const fetcher = async <T>(url: string, params?: IPartidosParams) => {
  const { data } = await api.get<T>(url, { params });

  return data;
};

export const usePartidos = (
  params?: IPartidosParams,
  reactQueryParams: { enabled?: boolean } = {},
) => {
  const queryData = useQuery(
    'partidos',
    () => fetcher<IPartidosResponse>('/partidos', params),
    reactQueryParams,
  );

  return queryData;
};

export const usePartido = (partidoId?: string) => {
  const queryData = useQuery(`partidos/${partidoId}`, () =>
    fetcher<IPartidoResponse>(`/partidos/${partidoId}`),
  );

  return queryData;
};
