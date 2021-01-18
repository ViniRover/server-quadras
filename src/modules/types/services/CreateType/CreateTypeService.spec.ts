import AppError from '@shared/error/AppError';
import FakeTypesRepository from '@modules/types/repositories/fakes/FakeTypesRepository';
import CreateTypeService from './CreateTypeService';

let fakeTypesRepository: FakeTypesRepository;
let createType: CreateTypeService;

describe('CreateType', () => {
  beforeEach(() => {
    fakeTypesRepository = new FakeTypesRepository();
    createType = new CreateTypeService(fakeTypesRepository);
  });

  it('should be able to create a type', async () => {
    const type = await createType.execute({
      name: 'name',
      value: 400.0,
    });

    expect(type).toHaveProperty('id');
  });

  it('should not be able to create a type with the same name', async () => {
    await createType.execute({
      name: 'name',
      value: 400.0,
    });

    await expect(
      createType.execute({
        name: 'name',
        value: 400.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
