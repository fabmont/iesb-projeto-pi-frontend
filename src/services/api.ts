import axios from 'axios';

export const BASE_URL = 'https://dadosabertos.camara.leg.br/api/v2/';

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
