import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import ProfilesController from '../controllers/ProfilesController';
import ensureAuthentication from '../middlewares/ensureAuthentication';

const profileRouter = Router();
const profileController = new ProfilesController();

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  ensureAuthentication,
  profileController.update,
);

export default profileRouter;
