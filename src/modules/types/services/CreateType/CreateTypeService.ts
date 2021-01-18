import Type from '@modules/types/infra/typeorm/entities/Type';
import ITypesRepository from '@modules/types/repositories/ITypesRepository';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  value: number;
}

@injectable()
class CreateTypeService {
  constructor(
    @inject('TypesRepository')
    private typesRepository: ITypesRepository,
  ) {}

  public async execute({ name, value }: IRequest): Promise<Type> {
    const checkTypeExist = await this.typesRepository.findByName(name);

    if (checkTypeExist) {
      throw new AppError('This type already exists');
    }

    const type = await this.typesRepository.create({
      name,
      value,
    });

    return type;
  }
}

export default CreateTypeService;
