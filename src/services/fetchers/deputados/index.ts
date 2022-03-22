import { useQuery } from 'react-query';
import api from '../../api';
import { IDeputadosResponse, IDeputadoResponse } from './index.types';

export const fetchDeputados = async <T>(url: string) => {
  const { data } = await api.get<T>(url);

  return data;
};

export const useDeputados = () => {
  const queryData = useQuery('deputados', () =>
    fetchDeputados<IDeputadosResponse>('/deputados'),
  );

  return queryData;
};

export const useDeputado = (deputadoId = '') => {
  const queryData = useQuery(`deputado/${deputadoId}`, () =>
    fetchDeputados<IDeputadoResponse>(`/deputados/${deputadoId}`),
  );

  return queryData;
};
