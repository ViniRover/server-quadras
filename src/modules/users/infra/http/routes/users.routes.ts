import { Router } from 'express';
import { Segments, celebrate, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import ensureAuthentication from '../middlewares/ensureAuthentication';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      phone: Joi.string().required(),
      is_company: Joi.boolean().required(),
      cpf: Joi.alternatives().conditional('is_company', {
        is: true,
        then: Joi.any().forbidden(),
        otherwise: Joi.string().max(11).required(),
      }),
      cnpj: Joi.alternatives().conditional('is_company', {
        is: true,
        then: Joi.string().max(14).required(),
        otherwise: Joi.any().forbidden(),
      }),
      address: Joi.alternatives().conditional('is_company', {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.string(),
      }),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
