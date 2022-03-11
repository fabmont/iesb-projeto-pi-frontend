export interface IDeputadosDetails {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
}

export interface IDeputadosLinks {
  href: string;
  rel: string;
}

export interface IDeputadosResponse {
  dados: IDeputadosDetails[];
  links: IDeputadosLinks[];
}
