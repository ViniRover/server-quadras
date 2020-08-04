import { injectable, inject } from 'tsyringe';

import Field from '@modules/fields/infra/typeorm/entities/Field';
import IFieldsRepository from '@modules/fields/repositories/IFieldsRepository';
import AppError from '@shared/error/AppError';

interface IResquest {
  name: string;
}

@injectable()
class CreateFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository,
  ) {}

  public async execute({ name }: IResquest): Promise<Field> {
    const checkFieldExist = await this.fieldsRepository.findByName(name);

    if (checkFieldExist) {
      throw new AppError('This field already exists');
    }

    const field = await this.fieldsRepository.createField({
      name,
    });

    return field;
  }
}

export default CreateFieldService;
