import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/error/AppError';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    const authenticatedUser = await authenticateUser.execute({
      email: 'name2@example.com',
      password: 'password',
    });

    expect(authenticatedUser).toHaveProperty('token');
    expect(authenticatedUser.user).toEqual(user);
  });

  it('should not be able to authenticate an user with the wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    await expect(
      authenticateUser.execute({
        email: 'name2@example.com',
        password: 'wrong_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate a non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'email@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
