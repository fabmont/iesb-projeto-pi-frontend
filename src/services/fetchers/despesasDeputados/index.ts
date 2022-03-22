import { useQuery } from 'react-query';
import api from '../../api';
import { IDespesaParams, IDespesasResponse } from './index.types';

export const fetcher = async <T>(url: string, params: IDespesaParams) => {
  const { data } = await api.get<T>(url, { params });

  return data;
};

export const useDeputadosDespesas = (
  deputadoId: string,
  params: IDespesaParams,
) => {
  const queryData = useQuery('eventos', () =>
    fetcher<IDespesasResponse>(`/deputados/${deputadoId}/despesas`, {
      ...params,
      itens: 8,
      ordenarPor: 'ano',
    }),
  );

  return queryData;
};
