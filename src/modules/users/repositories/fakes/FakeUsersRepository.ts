import { uuid } from 'uuidv4';

import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(dataUser: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, dataUser);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const indexUser = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[indexUser] = user;

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.id === id);

    return user;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.users.find(findUser => findUser.cpf === cpf);

    return user;
  }
}

export default FakeUsersRepository;
