import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUser/AuthenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;

      const autheticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await autheticateUser.execute({
        email,
        password,
      });

      return response.json({ user: classToClass(user), token });
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}

export default SessionsController;
