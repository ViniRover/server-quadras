import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';
import LocationsController from '../controllers/LocationsController';

const locationsRouter = Router();
const locationsController = new LocationsController();

locationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cnpj: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.string().required(),
    },
  }),
  locationsController.create,
);

export default locationsRouter;
