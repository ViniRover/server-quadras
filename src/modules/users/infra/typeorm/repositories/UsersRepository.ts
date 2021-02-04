import { getRepository, Repository } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    password,
    email,
    cpf,
    cnpj,
    phone,
    address,
    is_company,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({
      name,
      password,
      cpf,
      email,
      address,
      phone,
      cnpj,
      is_company,
    });

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cpf },
    });

    return user;
  }

  public async findByCnpj(cnpj: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return user;
  }
}

export default UsersRepository;
