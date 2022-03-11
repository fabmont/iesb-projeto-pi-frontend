import useSWR from 'swr';
import api from '../../api';
import { IEventoResponse, IEventosResponse } from './index.types';

export const fetchEventos = async <T>(url: string) => {
  const { data } = await api.get<T>(url);

  return data;
};

export const useEventos = () => {
  const swrData = useSWR(
    '/eventos',
    (url) => fetchEventos<IEventosResponse>(url),
    { suspense: true },
  );

  return swrData;
};

export const useEvento = (eventoId?: string) => {
  const swrData = useSWR(
    `/eventos/${eventoId}`,
    (url) => fetchEventos<IEventoResponse>(url),
    {
      suspense: true,
    },
  );

  return swrData;
};
