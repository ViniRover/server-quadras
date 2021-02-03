import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IFieldsRepository from '@modules/fields/repositories/IFieldsRepository';
import FieldsRepository from '@modules/fields/infra/typeorm/repositories/FIeldsRepository';
import IReservationsRepository from '@modules/reservations/repositories/IReservationsRepository';
import ReservationsRepository from '@modules/reservations/infra/typeorm/repositories/ReservationsRepository';
import ITypesRepository from '@modules/types/repositories/ITypesRepository';
import TypesRepository from '@modules/types/infra/typeorm/repositories/TypesRepository';
import ILocationsRepository from '@modules/locations/repositories/ILocationsRepository';
import LocationsRepository from '@modules/locations/infra/typeorm/repositories/LocationsRepository';

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

container.registerSingleton<ITypesRepository>(
  'TypesRepository',
  TypesRepository,
);

container.registerSingleton<ILocationsRepository>(
  'LocationsRepository',
  LocationsRepository,
);
