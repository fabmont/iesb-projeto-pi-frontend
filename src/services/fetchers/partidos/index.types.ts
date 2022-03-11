export interface IPartidoDetails {
  id: string;
  sigla: string;
  nome: string;
  uri: string;
}

export interface ILinksPartido {
  href: string;
  rel: string;
}

export interface IPartidosResponse {
  dados: IPartidoDetails[];
  links: ILinksPartido[];
}
