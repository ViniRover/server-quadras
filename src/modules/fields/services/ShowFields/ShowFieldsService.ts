import { injectable, inject } from 'tsyringe';
import IFieldsRepository from '@modules/fields/repositories/IFieldsRepository';
import Field from '@modules/fields/infra/typeorm/entities/Field';

@injectable()
class ShowFieldsService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository,
  ) {}

  public async execute(): Promise<Field[] | undefined> {
    const fields = await this.fieldsRepository.findAllField();

    return fields;
  }
}

export default ShowFieldsService;
