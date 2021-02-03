import Location from '@modules/locations/infra/typeorm/entities/Location';
import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/error/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  name: string;
  password: string;
  address: string;
  phone: string;
  cnpj: string;
  email: string;
}

@injectable()
class CreateLocationService {
  constructor(
    @inject('LocationsRepository')
    private locationsRepository: ILocationsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    password,
    address,
    phone,
    cnpj,
    email,
  }: IRequest): Promise<Location> {
    const findLocationCnpj = await this.locationsRepository.findByCnpj(cnpj);

    if (findLocationCnpj) {
      throw new AppError('This CNPJ already exists');
    }

    const findLocationEmail = await this.locationsRepository.findByEmail(email);

    if (findLocationEmail) {
      throw new AppError('This email already exists');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const location = await this.locationsRepository.create({
      name,
      address,
      phone,
      password: hashedPassword,
      email,
      cnpj,
    });

    return location;
  }
}

export default CreateLocationService;
