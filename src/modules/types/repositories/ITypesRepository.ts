import ICreateTypeDTO from '../dtos/ICreateTypeDTO';
import Type from '../infra/typeorm/entities/Type';

export default interface ITypesRepository {
  findByName(name: string): Promise<Type | undefined>;
  findById(type_id: string): Promise<Type | undefined>;
  create(data: ICreateTypeDTO): Promise<Type>;
  save(type: Type): Promise<Type>;
  findAll(): Promise<Type[] | undefined>;
}
