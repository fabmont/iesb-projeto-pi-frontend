import { useQuery } from 'react-query';
import api from '../../api';
import { IDeputadosResponse } from './index.types';

export const fetchDeputados = async () => {
  const { data } = await api.get<IDeputadosResponse>('/deputados');

  return data;
};

export const useDeputados = () => {
  const queryData = useQuery('deputados', fetchDeputados);

  return queryData;
};
