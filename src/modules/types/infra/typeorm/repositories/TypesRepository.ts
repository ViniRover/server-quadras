import ICreateTypeDTO from '@modules/types/dtos/ICreateTypeDTO';
import ITypesRepository from '@modules/types/repositories/ITypesRepository';
import { getRepository, Repository } from 'typeorm';
import Type from '../entities/Type';

class TypesRepository implements ITypesRepository {
  private ormRepository: Repository<Type>;

  constructor() {
    this.ormRepository = getRepository(Type);
  }

  public async create({ name, value }: ICreateTypeDTO): Promise<Type> {
    const type = this.ormRepository.create({
      name,
      value,
    });

    await this.save(type);

    return type;
  }

  public async save(type: Type): Promise<Type> {
    return this.ormRepository.save(type);
  }

  public async findByName(name: string): Promise<Type | undefined> {
    const type = await this.ormRepository.findOne({
      where: { name },
    });

    return type;
  }

  public async findById(type_id: string): Promise<Type | undefined> {
    const type = await this.ormRepository.findOne({
      where: { id: type_id },
    });

    return type;
  }

  public async findAll(): Promise<Type[] | undefined> {
    const types = await this.ormRepository.find();

    return types;
  }
}

export default TypesRepository;
