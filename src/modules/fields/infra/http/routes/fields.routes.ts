import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';
import FieldsController from '../controllers/FieldsController';

const fieldsRouter = Router();
const fieldsController = new FieldsController();

fieldsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
    },
  }),
  ensureAuthentication,
  fieldsController.create,
);

fieldsRouter.get('/', fieldsController.show);

export default fieldsRouter;
