import Type from '@modules/types/infra/typeorm/entities/Type';
import ITypesRepository from '@modules/types/repositories/ITypesRepository';
import { injectable, inject } from 'tsyringe';

@injectable()
class ShowTypesService {
  constructor(
    @inject('TypesRepository')
    private typesRepository: ITypesRepository,
  ) {}

  public async execute(): Promise<Type[] | undefined> {
    const types = await this.typesRepository.findAll();

    return types;
  }
}

export default ShowTypesService;
