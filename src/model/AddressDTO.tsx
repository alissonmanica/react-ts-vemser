export interface AddressDTO {
  address: {
    cep: string | null
    cidade: string | null
    complemento: string | null
    estado: string | null
    idEndereco: number | null
    logradouro: string | null
    numero: number | null
    pais: string | null
    tipo: string | null
  }[]
}