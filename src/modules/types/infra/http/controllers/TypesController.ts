import CreateTypeService from '@modules/types/services/CreateType/CreateTypeService';
import ShowTypesService from '@modules/types/services/ShowTypes/ShowTypesService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class TypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, value } = request.body;

      const createType = container.resolve(CreateTypeService);

      const type = await createType.execute({
        name,
        value,
      });

      return response.json(type);
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const listTypes = container.resolve(ShowTypesService);

      const types = await listTypes.execute();

      return response.json(types);
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}

export default TypesController;
