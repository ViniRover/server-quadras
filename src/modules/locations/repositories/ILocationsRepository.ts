import ICreateLocationDTO from '../dtos/ICreateLocationDTO';
import Location from '../infra/typeorm/entities/Location';

export default interface ILocationRepository {
  create(data: ICreateLocationDTO): Promise<Location>;
  findByCnpj(cnpj: string): Promise<Location | undefined>;
  findByName(name: string): Promise<Location[] | undefined>;
  findByEmail(email: string): Promise<Location | undefined>;
  findById(id: string): Promise<Location | undefined>;
  save(location: Location): Promise<Location>;
}
