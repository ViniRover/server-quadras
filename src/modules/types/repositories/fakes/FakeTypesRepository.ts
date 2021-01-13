import ICreateTypeDTO from '@modules/types/dtos/ICreateTypeDTO';
import Type from '@modules/types/infra/typeorm/entities/Field';
import { uuid } from 'uuidv4';
import ITypesRepository from '../ITypesRepository';

class FakeTypesRepository implements ITypesRepository {
  private types: Type[] = [];

  public async create(data: ICreateTypeDTO): Promise<Type> {
    const type = new Type();

    Object.assign(type, { id: uuid() }, data);

    this.types.push(type);

    return type;
  }

  public async save(type: Type): Promise<Type> {
    const indexType = this.types.findIndex(findType => findType.id === type.id);

    this.types[indexType] = type;

    return type;
  }

  public async findByName(name: string): Promise<Type | undefined> {
    const type = this.types.find(findType => findType.name === name);

    return type;
  }

  public async findById(type_id: string): Promise<Type | undefined> {
    const type = this.types.find(findType => findType.id === type_id);

    return type;
  }
}

export default FakeTypesRepository;
