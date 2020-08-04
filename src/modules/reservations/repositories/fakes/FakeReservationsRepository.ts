import Reservation from '@modules/reservations/infra/typeorm/entities/Reservation';
import ICreateReservationDTO from '@modules/reservations/dtos/ICreateReservationDTO';
import { uuid } from 'uuidv4';
import { isEqual, getDate, getMonth, getYear } from 'date-fns';
import IFindAllReservationsInDayDTO from '@modules/reservations/dtos/IFindAllReservationsInDayDTO';
import IReservationsRepository from '../IReservationsRepository';

class FakeReservationsRepository implements IReservationsRepository {
  private reservations: Reservation[] = [];

  public async createReservation({
    name,
    field_id,
    user_id,
    date,
  }: ICreateReservationDTO): Promise<Reservation> {
    const reservation = new Reservation();

    Object.assign(reservation, { id: uuid(), name, field_id, user_id, date });

    this.reservations.push(reservation);

    return reservation;
  }

  public async findAllResertvationsInDay({
    day,
    month,
    year,
  }: IFindAllReservationsInDayDTO): Promise<Reservation[] | undefined> {
    const reservations = this.reservations.filter(
      reserve =>
        getDate(reserve.date) === day &&
        getMonth(reserve.date) + 1 === month &&
        getYear(reserve.date) === year,
    );

    return reservations;
  }

  public async findByDate(
    date: Date,
    field_id: string,
  ): Promise<Reservation | undefined> {
    const reservation = this.reservations.find(
      reserve => isEqual(reserve.date, date) && reserve.field_id === field_id,
    );

    return reservation;
  }
}

export default FakeReservationsRepository;
