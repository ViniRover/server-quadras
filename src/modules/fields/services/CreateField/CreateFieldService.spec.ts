import FakeFieldsRepository from '@modules/fields/repositories/fakes/FakeFieldsRepository';
import AppError from '@shared/error/AppError';
import CreateFieldService from './CreateFieldService';

let fakeFieldsRepository: FakeFieldsRepository;
let createField: CreateFieldService;

describe('CreateField', () => {
  beforeEach(() => {
    fakeFieldsRepository = new FakeFieldsRepository();
    createField = new CreateFieldService(fakeFieldsRepository);
  });

  it('should be able to create a new field', async () => {
    const field = await createField.execute({
      name: 'field_name',
    });

    expect(field).toHaveProperty('id');
    expect(field.name).toBe('field_name');
  });

  it('should not be able to create a field with the same name', async () => {
    await createField.execute({
      name: 'field_name',
    });

    await expect(
      createField.execute({
        name: 'field_name',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
