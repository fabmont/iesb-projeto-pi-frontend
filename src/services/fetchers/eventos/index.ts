import { useQuery } from 'react-query';
import api from '../../api';
import { IDeputadosResponse } from '../deputados/index.types';
import {
  IEventoResponse,
  IEventosParams,
  IEventosResponse,
  ISituacaoEventoResponse,
} from './index.types';

export const fetcher = async <T>(url: string, params?: IEventosParams) => {
  const { data } = await api.get<T>(url, { params });

  return data;
};

export const useEventos = (
  params?: IEventosParams,
  reactQueryParams: { enabled?: boolean } = {},
) => {
  const queryData = useQuery(
    'eventos',
    () => fetcher<IEventosResponse>('/eventos', params),
    reactQueryParams,
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

export const useSituacoesEvento = () => {
  const queryData = useQuery('codSituacaoEvento', () =>
    fetcher<ISituacaoEventoResponse>('/referencias/eventos/codSituacaoEvento'),
  );

  return queryData;
};

export const useTiposEvento = () => {
  const queryData = useQuery('codTipoEvento', () =>
    fetcher<ISituacaoEventoResponse>('/referencias/eventos/codTipoEvento'),
  );

  return queryData;
};
