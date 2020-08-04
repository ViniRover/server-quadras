import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';
import { Repository, getRepository, Raw } from 'typeorm';
import ICreateReservationDTO from '@modules/reservations/dtos/ICreateReservationDTO';
import IFindAllReservationsInDayDTO from '@modules/reservations/dtos/IFindAllReservationsInDayDTO';
import Reservation from '../entities/Reservation';

class ReservationsRepository implements IReservationsRepository {
  private ormRepository: Repository<Reservation>;

  constructor() {
    this.ormRepository = getRepository(Reservation);
  }

  public async createReservation({
    name,
    date,
    field_id,
    user_id,
  }: ICreateReservationDTO): Promise<Reservation> {
    if (name) {
      const reservation = this.ormRepository.create({
        name,
        date,
        field_id,
      });

      await this.ormRepository.save(reservation);

      return reservation;
    }

    const reservation = this.ormRepository.create({
      user_id,
      date,
      field_id,
    });

    await this.ormRepository.save(reservation);

    return reservation;
  }

  public async findAllResertvationsInDay({
    day,
    month,
    year,
  }: IFindAllReservationsInDayDTO): Promise<Reservation[] | undefined> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const reservations = await this.ormRepository.find({
      where: {
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      relations: ['user'],
    });

    return reservations;
  }

  public async findByDate(
    date: Date,
    field_id: string,
  ): Promise<Reservation | undefined> {
    const reservation = await this.ormRepository.findOne({
      where: { date, field_id },
    });

    return reservation;
  }
}

export default ReservationsRepository;
