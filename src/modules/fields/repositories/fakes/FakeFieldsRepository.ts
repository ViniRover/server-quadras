import { uuid } from 'uuidv4';

import IFieldsRepository from '@modules/fields/repositories/IFieldsRepository';
import Field from '@modules/fields/infra/typeorm/entities/Field';
import ICreateFieldDTO from '@modules/fields/dtos/ICreateFieldDTO';

class FakeFieldsRepository implements IFieldsRepository {
  private fields: Field[] = [];

  public async createField({ name }: ICreateFieldDTO): Promise<Field> {
    const field = new Field();

    Object.assign(field, { id: uuid(), name });

    this.fields.push(field);

    return field;
  }

  public async findAllField(): Promise<Field[] | undefined> {
    return this.fields;
  }

  public async findByName(name: string): Promise<Field | undefined> {
    const findField = this.fields.find(field => field.name === name);

    return findField;
  }
}

export default FakeFieldsRepository;
