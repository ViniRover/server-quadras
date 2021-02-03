import ICreateLocationDTO from '@modules/locations/dtos/ICreateLocationDTO';
import ILocationRepository from '@modules/locations/repositories/ILocationsRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Location from '../entities/Location';

class LocationsRepository implements ILocationRepository {
  private ormRepository: Repository<Location>;

  constructor() {
    this.ormRepository = getRepository(Location);
  }

  public async create({
    name,
    address,
    password,
    cnpj,
    phone,
    email,
  }: ICreateLocationDTO): Promise<Location> {
    const location = this.ormRepository.create({
      name,
      address,
      password,
      cnpj,
      phone,
      email,
    });

    await this.save(location);

    return location;
  }

  public async save(location: Location): Promise<Location> {
    return this.ormRepository.save(location);
  }

  public async findByCnpj(cnpj: string): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne({
      where: { cnpj },
    });

    return location;
  }

  public async findByName(name: string): Promise<Location[] | undefined> {
    const locations = await this.ormRepository.find({
      name: Like(`%${name}%`),
    });

    return locations;
  }

  public async findByEmail(email: string): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne({
      where: { email },
    });

    return location;
  }

  public async findById(id: string): Promise<Location | undefined> {
    const location = await this.ormRepository.findOne({
      where: { id },
    });

    return location;
  }
}

export default LocationsRepository;
