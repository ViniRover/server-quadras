export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone: string;
  is_company: boolean;
  cpf?: string;
  cnpj?: string;
  address?: string;
}
