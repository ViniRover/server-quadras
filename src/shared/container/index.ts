import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IFieldsRepository from '@modules/fields/repositories/IFieldsRepository';
import FieldsRepository from '@modules/fields/infra/typeorm/repositories/FIeldsRepository';
import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';
import ReservationsRepository from '@modules/reservations/infra/typeorm/repositories/ReservationsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IFieldsRepository>(
  'FieldsRepository',
  FieldsRepository,
);

container.registerSingleton<IReservationsRepository>(
  'ReservationsRepository',
  ReservationsRepository,
);
