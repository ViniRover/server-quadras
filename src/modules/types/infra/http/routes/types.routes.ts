import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import TypesController from '../controllers/TypesController';

const typesRouter = Router();
const typesController = new TypesController();

typesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  ensureAuthentication,
  typesController.create,
);

export default typesRouter;
