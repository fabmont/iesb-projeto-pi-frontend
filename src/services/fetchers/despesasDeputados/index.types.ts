export interface IDespesaParams {
  ano?: number[] | number | string[] | string;
  mes?: number[] | number | string[] | string;
  pagina?: number;
  ordenarPor?: 'ano' | 'mes';
  itens?: number;
}

export interface ILinksDetails {
  rel: string;
  href: string;
}

export interface IDespesasDetails {
  ano: number;
  cnpjCpfFornecedor: string;
  codDocumento: number;
  codLote: number;
  codTipoDocumento: number;
  dataDocumento: string;
  mes: number;
  nomeFornecedor: string;
  numDocumento: string;
  numRessarcimento: string;
  parcela: number;
  tipoDespesa: string;
  tipoDocumento: string;
  urlDocumento: string;
  valorDocumento: number;
  valorGlosa: number;
  valorLiquido: number;
}

export interface IDespesasResponse {
  dados: IDespesasDetails[];
  links: ILinksDetails[];
}
