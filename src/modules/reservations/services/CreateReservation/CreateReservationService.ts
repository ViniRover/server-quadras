import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours } from 'date-fns';

import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';
import Reservation from '@modules/reservations/infra/typeorm/entities/Reservation';
import AppError from '@shared/error/AppError';

interface IRequest {
  name?: string;
  user_id?: string;
  field_id: string;
  date: Date;
}

@injectable()
class CreateReservationService {
  constructor(
    @inject('ReservationsRepository')
    private reservationsRepository: IReservationsRepository,
  ) {}

  public async execute({
    name,
    user_id,
    field_id,
    date,
  }: IRequest): Promise<Reservation> {
    const reservationDate = startOfHour(date);

    if (isBefore(reservationDate, Date.now())) {
      throw new AppError('You cant´t reserve on a past date');
    }

    if (getHours(reservationDate) < 9 || getHours(reservationDate) > 23) {
      throw new AppError(
        'You can only create appointments between 9 a.m and 11 p.m.',
      );
    }

    const checkReservationExists = await this.reservationsRepository.findByDate(
      reservationDate,
    );

    if (checkReservationExists) {
      throw new AppError('This date is already booked');
    }

    const reservation = await this.reservationsRepository.createReservation({
      name,
      user_id,
      field_id,
      date,
    });

    return reservation;
  }
}

export default CreateReservationService;
