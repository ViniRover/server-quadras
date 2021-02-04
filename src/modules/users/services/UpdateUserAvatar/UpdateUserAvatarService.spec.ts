import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStoragePRovider';
import AppError from '@shared/error/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update user avatar', async () => {
    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to update avatar from a non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'no_id',
        avatarFileName: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the old avatar with there is one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'name',
      email: 'name2@example.com',
      password: 'password',
      phone: 'user_phone',
      cpf: 'cpf',
      is_company: false,
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');
    expect(user.avatar).toBe('avatar2.png');
  });
});
