import { useQuery } from 'react-query';
import api from '../../api';
import { IUFResponse } from './index.types';

export const fetcher = async <T>(url: string) => {
  const { data } = await api.get<T>(url);

  return data;
};

export const useUF = () => {
  const queryData = useQuery('ufs', () =>
    fetcher<IUFResponse>('/referencias/uf'),
  );

  return queryData;
};
