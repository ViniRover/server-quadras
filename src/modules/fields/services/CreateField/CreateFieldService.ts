import { injectable, inject } from 'tsyringe';

import Field from '@modules/fields/infra/typeorm/entities/Field';
import IFieldsRepository from '@modules/fields/repositories/IFieldsRepository';
import AppError from '@shared/error/AppError';

interface IResquest {
  name: string;
  type_id: string;
}

@injectable()
class CreateFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository,
  ) {}

  public async execute({ name, type_id }: IResquest): Promise<Field> {
    const checkFieldExist = await this.fieldsRepository.findByName(name);

    if (checkFieldExist) {
      throw new AppError('This field already exists');
    }

    const field = await this.fieldsRepository.createField({
      name,
      type_id,
    });

    return field;
  }
}

export default CreateFieldService;
