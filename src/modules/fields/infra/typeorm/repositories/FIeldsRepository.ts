import { getRepository, Repository } from 'typeorm';

import IFieldsRepository from '@modules/fields/repositories/IFieldsRepository';
import ICreateFieldDTO from '@modules/fields/dtos/ICreateFieldDTO';
import Field from '../entities/Field';

class FieldsRepository implements IFieldsRepository {
  private ormRepository: Repository<Field>;

  constructor() {
    this.ormRepository = getRepository(Field);
  }

  public async createField({
    name,
    type_id,
    user_id,
  }: ICreateFieldDTO): Promise<Field> {
    const field = this.ormRepository.create({
      name,
      type_id,
      user_id,
    });

    await this.ormRepository.save(field);

    return field;
  }

  public async findAllField(): Promise<Field[] | undefined> {
    const fields = await this.ormRepository.find();

    return fields;
  }

  public async findByName(name: string): Promise<Field | undefined> {
    const fields = await this.ormRepository.findOne({
      where: { name },
    });

    return fields;
  }
}

export default FieldsRepository;
