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
      name: 'user_name',
      password: 'user_password',
      email: 'user_email',
      cnpj: 'user_cnpj',
      phone: 'user_phone',
      address: 'user_address',
      is_company: true,
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with a same email', async () => {
    await createUser.execute({
      name: 'user_name',
      password: 'user_password',
      email: 'user_email',
      cnpj: 'user_cnpj',
      phone: 'user_phone',
      address: 'user_address',
      is_company: true,
    });

    await expect(
      createUser.execute({
        name: 'user_name',
        password: 'user_password',
        email: 'user_email',
        cnpj: 'user_cnpj2',
        phone: 'user_phone',
        address: 'user_address',
        is_company: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with the same CNPJ', async () => {
    await createUser.execute({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      address: 'user_address',
      cnpj: 'user_cnpj',
      is_company: false,
    });

    await expect(
      createUser.execute({
        name: 'name',
        email: 'name3@example.com',
        password: 'password',
        phone: 'user_phone',
        address: 'user_address',
        cnpj: 'user_cnpj',
        is_company: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an user with the same CPF', async () => {
    await createUser.execute({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'user_cpf',
      is_company: false,
    });

    await expect(
      createUser.execute({
        name: 'name',
        email: 'name@example.com',
        password: 'password',
        phone: 'user_phone',
        cpf: 'user_cpf',
        is_company: false,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
