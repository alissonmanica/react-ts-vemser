export interface PeopleDTO {
  pessoa: {
    idPessoa?: number | null,
    nome: string | null,
    email: string | null,
    cpf: string | null,
    dataNascimento: string | null
  }[]
}