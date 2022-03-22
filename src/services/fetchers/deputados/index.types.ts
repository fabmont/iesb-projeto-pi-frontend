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

export interface IDeputadoDetails {
  cpf: string;
  dataFalecimento: string;
  dataNascimento: string;
  escolaridade: string;
  id: number;
  municipioNascimento: string;
  nomeCivil: string;
  redeSocial: [string];
  sexo: string;
  ufNascimento: string;
  ultimoStatus: {
    condicaoEleitoral: string;
    data: string;
    descricaoStatus: string;
    email: string;
    gabinete: {
      andar: string;
      email: string;
      nome: string;
      predio: string;
      sala: string;
      telefone: string;
    };
    id: number;
    idLegislatura: number;
    nome: string;
    nomeEleitoral: string;
    siglaPartido: string;
    siglaUf: string;
    situacao: string;
    uri: string;
    uriPartido: string;
    urlFoto: string;
  };
  uri: string;
  urlWebsite: string;
}

export interface IDeputadoResponse {
  dados: IDeputadoDetails;
  links: IDeputadosLinks[];
}
