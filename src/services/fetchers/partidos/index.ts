import useSWR from 'swr';
import api from '../../api';
import { IPartidosResponse } from './index.types';

export const fetchPartidos = async (url: string) => {
  const { data } = await api.get<IPartidosResponse>(url);

  return data;
};

export const usePartidos = () => {
  const swrData = useSWR('/partidos', fetchPartidos, { suspense: true });

  return swrData;
};
