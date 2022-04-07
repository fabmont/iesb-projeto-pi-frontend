export interface IPartidosDetails {
  id: string;
  sigla: string;
  nome: string;
  uri: string;
}

export interface IPartidoDetail {
  id: number;
  nome: string;
  numeroEleitoral: number;
  sigla: string;
  status: {
    data: string;
    idLegislatura: string;
    lider: {
      idLegislatura: number;
      nome: string;
      siglaPartido: string;
      uf: string;
      uri: string;
      uriPartido: string;
      urlFoto: string;
    };
    situacao: string;
    totalMembros: string;
    totalPosse: string;
    uriMembros: string;
  };
  uri: string;
  urlFacebook?: string;
  urlLogo: string;
  urlWebSite?: string;
}

export interface ILinksPartido {
  href: string;
  rel: string;
}

export interface IPartidosResponse {
  dados: IPartidosDetails[];
  links: ILinksPartido[];
}

export interface IPartidoResponse {
  dados: IPartidoDetail;
  links: ILinksPartido[];
}
