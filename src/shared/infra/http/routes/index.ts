import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import fieldsRouter from '@modules/fields/infra/http/routes/fields.routes';
import reservationsRouter from '@modules/reservations/infra/http/routes/reservations.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import typesRouter from '@modules/types/infra/http/routes/types.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/fields', fieldsRouter);
routes.use('/reservations', reservationsRouter);
routes.use('/profile', profileRouter);
routes.use('/types', typesRouter);

export default routes;
