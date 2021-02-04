import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFieldService from '@modules/fields/services/CreateField/CreateFieldService';
import ShowFieldsService from '@modules/fields/services/ShowFields/ShowFieldsService';

class FieldsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, type_id } = request.body;

      const createField = container.resolve(CreateFieldService);

      const field = await createField.execute({
        name,
        type_id,
        user_id: request.user.id,
      });

      return response.json(field);
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }

  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const showFields = container.resolve(ShowFieldsService);

      const fields = await showFields.execute();

      return response.json(fields);
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}

export default FieldsController;
