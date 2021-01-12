import ICreateTypeDTO from '../dtos/ICreateTypeDTO';
import Type from '../infra/typeorm/entities/Field';

export default interface ITypesRepository {
  findByName(name: string): Promise<Type | undefined>;
  create(data: ICreateTypeDTO): Promise<Type>;
  save(type: Type): Promise<Type>;
}
