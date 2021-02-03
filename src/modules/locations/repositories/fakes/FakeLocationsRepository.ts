import ICreateLocationDTO from '@modules/locations/dtos/ICreateLocationDTO';
import Location from '@modules/locations/infra/typeorm/entities/Location';
import { uuid } from 'uuidv4';
import ILocationsRepository from '../ILocationsRepository';

class FakeLocationsRepository implements ILocationsRepository {
  private locations: Location[] = [];

  public async create(dataLocation: ICreateLocationDTO): Promise<Location> {
    const location = new Location();

    Object.assign(location, { id: uuid() }, dataLocation);

    this.locations.push(location);

    return location;
  }

  public async save(location: Location): Promise<Location> {
    const indexLocation = this.locations.findIndex(
      findLocation => findLocation.id === location.id,
    );

    this.locations[indexLocation] = location;

    return location;
  }

  public async findByCnpj(cnpj: string): Promise<Location | undefined> {
    const location = this.locations.find(
      findLocation => findLocation.cnpj === cnpj,
    );

    return location;
  }

  public async findByName(name: string): Promise<Location[] | undefined> {
    const locations = this.locations.filter(findLocation =>
      findLocation.name.includes(name),
    );

    return locations;
  }

  public async findByEmail(email: string): Promise<Location | undefined> {
    const location = this.locations.find(
      findLocation => findLocation.cnpj === email,
    );

    return location;
  }

  public async findById(id: string): Promise<Location | undefined> {
    const location = this.locations.find(
      findLocation => findLocation.id === id,
    );

    return location;
  }
}

export default FakeLocationsRepository;
