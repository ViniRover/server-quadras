import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/error/AppError';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create an user', async () => {
    const user = await createUser.execute({
      name: 'name',
      email: 'name@example.com',
      password: 'password',
      cpf: 'cpf',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with a same email', async () => {
    await createUser.execute({
      name: 'name',
      email: 'name@example.com',
      password: 'password',
      cpf: 'cpf',
    });

    await expect(
      createUser.execute({
        name: 'name',
        email: 'name@example.com',
        password: 'password',
        cpf: 'cpf2',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with the same CPF', async () => {
    await createUser.execute({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      cpf: 'cpf',
    });

    await expect(
      createUser.execute({
        name: 'name',
        email: 'name@example.com',
        password: 'password',
        cpf: 'cpf',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
