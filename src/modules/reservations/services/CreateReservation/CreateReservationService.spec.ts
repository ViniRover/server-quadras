import FakeReservationsRepository from '@modules/reservations/repositories/fakes/FakeReservationsRepository';
import AppError from '@shared/error/AppError';
import CreateReservationService from './CreateReservationService';

let fakeReservationsRepository: FakeReservationsRepository;
let createReservation: CreateReservationService;

describe('CreateReservation', () => {
  beforeEach(() => {
    fakeReservationsRepository = new FakeReservationsRepository();
    createReservation = new CreateReservationService(
      fakeReservationsRepository,
    );
  });

  it('should be able to create a reservation', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const reservation = await createReservation.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user_id',
      field_id: 'field_id',
    });

    expect(reservation).toHaveProperty('id');
    expect(reservation.name).toBe(undefined);
  });

  it('should be able to create a reservation without an user', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const reservation = await createReservation.execute({
      date: new Date(2020, 4, 10, 13),
      name: 'name',
      field_id: 'field_id',
    });

    expect(reservation).toHaveProperty('id');
    expect(reservation.name).toBe('name');
    expect(reservation.user_id).toBe(undefined);
  });

  it('should not be able to create a reservation in a paste time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createReservation.execute({
        date: new Date(2020, 4, 10, 11),
        name: 'name',
        field_id: 'field_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a reservation before 9 a.m or after 11 p.m', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createReservation.execute({
        date: new Date(2020, 4, 11, 8),
        name: 'name',
        field_id: 'field_id',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createReservation.execute({
        date: new Date(2020, 4, 11, 24),
        name: 'name',
        field_id: 'field_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a reservation on a same date and field', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await createReservation.execute({
      date: new Date(2020, 10, 10, 13),
      user_id: 'user_id',
      field_id: 'field_id',
    });

    await expect(
      createReservation.execute({
        date: new Date(2020, 10, 10, 13),
        user_id: 'user_id',
        field_id: 'field_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
