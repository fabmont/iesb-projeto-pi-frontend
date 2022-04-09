export interface IUFDetails {
  cod: string;
  sigla: string;
  nome: string;
  descricao: string;
}

export interface IUFLinks {
  href: string;
  rel: string;
}

export interface IUFResponse {
  dados: IUFDetails[];
  links: IUFLinks[];
}
