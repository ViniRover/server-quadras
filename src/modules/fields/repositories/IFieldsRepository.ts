import Field from '../infra/typeorm/entities/Field';
import ICreateFieldDTO from '../dtos/ICreateFieldDTO';

export default interface IFieldsRepository {
  createField(data: ICreateFieldDTO): Promise<Field>;
  findAllField(): Promise<Field[] | undefined>;
  findOneField(field_id: string): Promise<Field | undefined>;
  findByName(name: string): Promise<Field | undefined>;
}
