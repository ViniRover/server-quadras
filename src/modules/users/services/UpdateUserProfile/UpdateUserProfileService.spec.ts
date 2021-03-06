import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/error/AppError';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateUserProfile: UpdateUserProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserProfile = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    const updatedUser = await updateUserProfile.execute({
      name: 'new_name',
      email: 'new_email@example.com',
      phone: 'new_user_phone',
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('new_name');
    expect(updatedUser.email).toBe('new_email@example.com');
    expect(updatedUser.phone).toBe('new_user_phone');
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'new_name',
      email: 'new_email@example.com',
      phone: 'user_phone',
      old_password: 'password',
      password: 'new_password',
    });

    expect(updatedUser.password).toBe('new_password');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'new_name',
        email: 'new_email@example.com',
        phone: 'new_user_phone',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to an existing e-mail', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    await fakeUsersRepository.create({
      name: 'name',
      email: 'name@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf2',
      is_company: false,
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'new_name',
        phone: 'new_user_phone',
        email: 'name@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a non existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'user_id',
        name: 'new_name',
        phone: 'new_user_phone',
        email: 'email2@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with a wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'new_name',
        email: 'new_email@example.com',
        phone: 'new_user_phone',
        old_password: 'wrong_password',
        password: 'new_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the address', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      address: 'user_address',
      cpf: 'cpf',
      is_company: false,
    });

    const updatedUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'new_name',
      email: 'new_email@example.com',
      phone: 'new_user_phone',
      address: 'new_user_address',
    });

    expect(updatedUser.address).toEqual('new_user_address');
  });
});
