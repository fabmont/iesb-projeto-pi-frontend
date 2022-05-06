export interface IDetalheEventos {
  dataHoraFim?: string;
  dataHoraInicio: string;
  descricao: string;
  descricaoTipo: string;
  id: 0;
  localCamara: {
    andar: string;
    nome: string;
    predio: string;
    sala: string;
  };
  localExterno?: string;
  orgaos: [
    {
      apelido: string;
      codTipoOrgao: 0;
      id: 0;
      nome: string;
      nomePublicacao: string;
      sigla: string;
      tipoOrgao: string;
      uri: string;
    },
  ];
  situacao: string;
  uri: string;
  urlRegistro: string;
}

export interface IDetalheEvento {
  dataHoraFim: string;
  dataHoraInicio: string;
  descricao: string;
  descricaoTipo: string;
  fases: string;
  id: number;
  localCamara: {
    andar: string;
    nome: string;
    predio: string;
    sala: string;
  };
  localExterno: string;
  orgaos: [
    {
      apelido: string;
      codTipoOrgao: number;
      id: number;
      nome: string;
      nomePublicacao: string;
      sigla: string;
      tipoOrgao: string;
      uri: string;
    },
  ];
  requerimentos: [
    {
      titulo: string;
      uri: string;
    },
  ];
  situacao: string;
  uri: string;
  uriConvidados: string;
  uriDeputados: string;
  urlDocumentoPauta: string;
  urlRegistro: string;
}

export interface ILinksEvento {
  href: string;
  rel: string;
}

export interface IEventosResponse {
  dados: IDetalheEventos[];
  links: ILinksEvento[];
}

export interface IEventoResponse {
  dados: IDetalheEvento;
  links: ILinksEvento[];
}

export interface IEventosParams {
  dataInicio?: string;
  dataFim?: string;
  codSituacao?: string;
  codTipoEvento?: string;
  ordem?: 'asc' | 'desc';
  ordenarPor?:
    | 'id'
    | 'dataHoraInicio'
    | 'dataHoraFim'
    | 'descricaoSituacao'
    | 'descricaoTipo'
    | 'titulo';
  itens?: number;
  pagina?: number;
}

export interface ISituacaoEvento {
  cod: string;
  sigla?: string;
  nome: string;
  descricao?: string;
}

export interface ISituacaoEventoResponse {
  dados: ISituacaoEvento[];
  links: ILinksEvento[];
}
