import { useQuery } from 'react-query';
import api from '../../api';
import { IPartidosResponse } from './index.types';

export const fetchPartidos = async () => {
  const { data } = await api.get<IPartidosResponse>('/partidos');

  return data;
};

export const usePartidos = () => {
  const queryData = useQuery('partidos', fetchPartidos);

  return queryData;
};
