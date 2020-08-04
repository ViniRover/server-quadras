import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import LoggedReservationsController from '../controllers/LoggedReservationsController';
import ReservationsController from '../controllers/ReservationsController';

const reservationsRouter = Router();
const loggedReservationsController = new LoggedReservationsController();
const reservationsController = new ReservationsController();

reservationsRouter.post(
  '/logged',
  celebrate({
    [Segments.BODY]: {
      field_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  ensureAuthentication,
  loggedReservationsController.create,
);

reservationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      field_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  reservationsController.create,
);

export default reservationsRouter;
