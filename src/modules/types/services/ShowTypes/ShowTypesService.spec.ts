import FakeTypesRepository from '@modules/types/repositories/fakes/FakeTypesRepository';
import CreateTypeService from '../CreateType/CreateTypeService';
import ShowTypesService from './ShowTypesService';

let fakeTypesRepository: FakeTypesRepository;
let createType: CreateTypeService;
let showTypes: ShowTypesService;

describe('ShowTypes', () => {
  beforeEach(() => {
    fakeTypesRepository = new FakeTypesRepository();
    createType = new CreateTypeService(fakeTypesRepository);
    showTypes = new ShowTypesService(fakeTypesRepository);
  });

  it('should be able to list all types', async () => {
    const type = await createType.execute({
      name: 'name',
      value: 400.0,
    });

    const type2 = await createType.execute({
      name: 'name2',
      value: 300.0,
    });

    const types = await showTypes.execute();

    expect(types).toEqual([type, type2]);
  });
});
