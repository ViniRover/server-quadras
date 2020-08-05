import FakeFieldsRepository from '@modules/fields/repositories/fakes/FakeFieldsRepository';
import ShowFieldsService from './ShowFieldsService';
import CreateFieldService from '../CreateField/CreateFieldService';

let fakeFieldsRepository: FakeFieldsRepository;
let showFields: ShowFieldsService;
let createField: CreateFieldService;

describe('CreateField', () => {
  beforeEach(() => {
    fakeFieldsRepository = new FakeFieldsRepository();
    showFields = new ShowFieldsService(fakeFieldsRepository);
    createField = new CreateFieldService(fakeFieldsRepository);
  });

  it('should be able to create a new field', async () => {
    const field = await createField.execute({
      name: 'field_name',
    });

    const fields = await showFields.execute();

    expect(fields).toEqual([field]);
  });
});
