import CreateLocationService from '@modules/locations/services/CreateLocation/CreateLocationService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class LocationsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, address, cnpj, password, phone } = request.body;

      const createLocation = container.resolve(CreateLocationService);

      const location = await createLocation.execute({
        name,
        email,
        address,
        cnpj,
        password,
        phone,
      });

      return response.json(classToClass(location));
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}

export default LocationsController;
