import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFieldService from '@modules/fields/services/CreateField/CreateFieldService';
import ShowFieldsService from '@modules/fields/services/ShowFields/ShowFieldsService';

class FieldsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createField = container.resolve(CreateFieldService);

    const field = await createField.execute({
      name,
    });

    return response.json(field);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const showFields = container.resolve(ShowFieldsService);

    const fields = await showFields.execute();

    return response.json(fields);
  }
}

export default FieldsController;
