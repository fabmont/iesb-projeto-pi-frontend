import { useQuery } from 'react-query';
import api from '../../api';
import {
  IDeputadosResponse,
  IDeputadoResponse,
  IDeputadosParams,
} from './index.types';

export const fetchDeputados = async <T>(
  url: string,
  params: IDeputadosParams,
) => {
  const { data } = await api.get<T>(url, { params });

  return data;
};

export const useDeputados = (
  params: IDeputadosParams = {},
  reactQueryParams: { enabled?: boolean } = {},
) => {
  const queryData = useQuery(
    'deputados',
    () => fetchDeputados<IDeputadosResponse>('/deputados', params),
    reactQueryParams,
  );

  return queryData;
};

export const useDeputado = (deputadoId = '') => {
  const queryData = useQuery(`deputado/${deputadoId}`, () =>
    fetchDeputados<IDeputadoResponse>(`/deputados/${deputadoId}`, {}),
  );

  return queryData;
};
