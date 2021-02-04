import FakeFieldsRepository from '@modules/fields/repositories/fakes/FakeFieldsRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUser/CreateUserService';
import AppError from '@shared/error/AppError';
import CreateFieldService from './CreateFieldService';

let fakeFieldsRepository: FakeFieldsRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createField: CreateFieldService;
let createUser: CreateUserService;
let user: User;

describe('CreateField', () => {
  beforeEach(async () => {
    fakeFieldsRepository = new FakeFieldsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createField = new CreateFieldService(
      fakeFieldsRepository,
      fakeUsersRepository,
    );

    user = await createUser.execute({
      name: 'user_name',
      password: 'user_password',
      email: 'user_email',
      cnpj: 'user_cnpj',
      phone: 'user_phone',
      address: 'user_address',
      is_company: true,
    });
  });

  it('should be able to create a new field', async () => {
    const field = await createField.execute({
      name: 'field_name',
      type_id: 'type_id',
      user_id: user.id,
    });

    expect(field).toHaveProperty('id');
    expect(field.name).toBe('field_name');
  });

  it('should not be able to create a field with the same name', async () => {
    await createField.execute({
      name: 'field_name',
      type_id: 'type_id',
      user_id: user.id,
    });

    await expect(
      createField.execute({
        name: 'field_name',
        type_id: 'type_id',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a field whit a non existing user', async () => {
    await expect(
      createField.execute({
        name: 'field_name',
        type_id: 'type_id',
        user_id: 'user_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a field if you are not a company', async () => {
    const userNotCompany = await createUser.execute({
      name: 'user_name',
      password: 'user_password',
      email: 'user_email_2',
      cpf: 'user_cpf',
      phone: 'user_phone',
      is_company: false,
    });

    await expect(
      createField.execute({
        name: 'field_name',
        type_id: 'type_id',
        user_id: userNotCompany.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
