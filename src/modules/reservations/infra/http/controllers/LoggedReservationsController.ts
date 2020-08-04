import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateReservationService from '@modules/reservations/services/CreateReservation/CreateReservationService';

class ReservationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, field_id, date } = request.body;

    const createReservation = container.resolve(CreateReservationService);

    const reservation = await createReservation.execute({
      name,
      user_id: request.user.id,
      field_id,
      date,
    });

    return response.json(reservation);
  }
}

export default ReservationsController;
