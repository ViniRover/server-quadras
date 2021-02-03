import { inject, injectable } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/error/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IResquest {
  name: string;
  email: string;
  cpf: string;
  password: string;
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
  }: IResquest): Promise<User> {
    const checkUserEmail = await this.usersRespository.findByEmail(email);

    if (checkUserEmail) {
      throw new AppError('This e-mail is already used');
    }

    const checkUserCpf = await this.usersRespository.findByCpf(cpf);

    if (checkUserCpf) {
      throw new AppError('This CPF already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRespository.create({
      name,
      email,
      cpf,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
