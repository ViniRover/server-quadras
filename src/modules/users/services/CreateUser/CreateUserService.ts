import 'reflect-metadata';

import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IResquest {
  name: string;
  email: string;
  password: string;
  phone: string;
  is_company: boolean;
  cpf?: string;
  cnpj?: string;
  address?: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRespository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    cpf,
    cnpj,
    is_company,
    phone,
    address,
  }: IResquest): Promise<User> {
    const checkUserEmail = await this.usersRespository.findByEmail(email);

    if (checkUserEmail) {
      throw new AppError('This e-mail is already used');
    }

    if (is_company && cnpj) {
      const checkUserCnpj = await this.usersRespository.findByCnpj(cnpj);

      if (checkUserCnpj) {
        throw new AppError('This CNPJ is already used');
      }
    }

    if (!is_company && cpf) {
      const checkUserCpf = await this.usersRespository.findByCpf(cpf);

      if (checkUserCpf) {
        throw new AppError('This CPF already exists');
      }
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRespository.create({
      name,
      email,
      phone,
      cpf,
      password: hashedPassword,
      is_company,
      address,
      cnpj,
    });

    return user;
  }
}

export default CreateUserService;
