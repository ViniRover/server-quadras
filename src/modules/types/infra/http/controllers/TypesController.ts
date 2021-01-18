import CreateTypeService from '@modules/types/services/CreateType/CreateTypeService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class TypesController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, value } = request.body;

      const createUser = container.resolve(CreateTypeService);

      const type = await createUser.execute({
        name,
        value,
      });

      return response.json(type);
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}

export default TypesController;
