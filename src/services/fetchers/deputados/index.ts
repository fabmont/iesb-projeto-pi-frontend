import useSWR from 'swr';
import api from '../../api';
import { IDeputadosResponse } from './index.types';

export const fetchDeputados = async (url: string) => {
  const { data } = await api.get<IDeputadosResponse>(url);

  return data;
};

export const useDeputados = () => {
  const swrData = useSWR('/deputados', fetchDeputados, { suspense: true });

  return swrData;
};
