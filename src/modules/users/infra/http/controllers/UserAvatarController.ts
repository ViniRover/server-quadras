import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatar/UpdateUserAvatarService';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const updateAvatarUser = container.resolve(UpdateUserAvatarService);

      const user = await updateAvatarUser.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename,
      });

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}

export default UserAvatarController;
