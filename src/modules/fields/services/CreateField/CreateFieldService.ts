import { injectable, inject } from 'tsyringe';

import Field from '@modules/fields/infra/typeorm/entities/Field';
import IFieldsRepository from '@modules/fields/repositories/IFieldsRepository';
import AppError from '@shared/error/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IResquest {
  name: string;
  type_id: string;
  user_id: string;
}

@injectable()
class CreateFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ name, type_id, user_id }: IResquest): Promise<Field> {
    const checkUserIsCompany = await this.usersRepository.findById(user_id);

    if (!checkUserIsCompany) {
      throw new AppError('This user does not exist');
    }

    if (!checkUserIsCompany?.is_company) {
      throw new AppError('You can not create a field if you are not a company');
    }

    const checkFieldExist = await this.fieldsRepository.findByName(name);

    if (checkFieldExist) {
      throw new AppError('This field already exists');
    }

    const field = await this.fieldsRepository.createField({
      name,
      type_id,
      user_id,
    });

    return field;
  }
}

export default CreateFieldService;
