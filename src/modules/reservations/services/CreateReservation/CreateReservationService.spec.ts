import FakeReservationsRepository from '@modules/reservations/repositories/fakes/FakeReservationsRepository';
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
});
