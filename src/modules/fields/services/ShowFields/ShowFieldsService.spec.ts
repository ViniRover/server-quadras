import FakeFieldsRepository from '@modules/fields/repositories/fakes/FakeFieldsRepository';
import CreateUserService from '@modules/users/services/CreateUser/CreateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateFieldService from '../CreateField/CreateFieldService';
import ShowFieldsService from './ShowFieldsService';

let fakeFieldsRepository: FakeFieldsRepository;
let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let showFields: ShowFieldsService;
let createField: CreateFieldService;
let createUser: CreateUserService;

describe('CreateField', () => {
  beforeEach(() => {
    fakeFieldsRepository = new FakeFieldsRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    showFields = new ShowFieldsService(fakeFieldsRepository);
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createField = new CreateFieldService(
      fakeFieldsRepository,
      fakeUsersRepository,
    );
  });

  it('should be able to list fields', async () => {
    const user = await createUser.execute({
      name: 'user_name',
      password: 'user_password',
      email: 'user_email',
      cnpj: 'user_cnpj',
      phone: 'user_phone',
      address: 'user_address',
      is_company: true,
    });

    const field = await createField.execute({
      name: 'field_name',
      type_id: 'type_id',
      user_id: user.id,
    });

    const fields = await showFields.execute();

    expect(fields).toEqual([field]);
  });
});
