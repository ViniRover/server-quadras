import Reservation from '../infra/typeorm/entities/Reservation';
import ICreateReservationDTO from '../dtos/ICreateReservationDTO';
import IFindAllReservationsInDayDTO from '../dtos/IFindAllReservationsInDayDTO';

export default interface IReservationsRepository {
  createReservation(data: ICreateReservationDTO): Promise<Reservation>;
  findAllResertvationsInDay(
    data: IFindAllReservationsInDayDTO,
  ): Promise<Reservation[] | undefined>;
  findByDate(date: Date, field_id: string): Promise<Reservation | undefined>;
}
