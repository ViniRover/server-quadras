import { Response, Request } from 'express';
import { container } from 'tsyringe';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfile/UpdateUserProfileService';
import { classToClass } from 'class-transformer';

class ProfilesController {
  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password, old_password } = request.body;

      const updateProfile = container.resolve(UpdateUserProfileService);

      const updatedProfile = await updateProfile.execute({
        user_id: request.user.id,
        name,
        email,
        password,
        old_password,
      });

      return response.json(classToClass(updatedProfile));
    } catch (err) {
      return response.status(400).json({ err: err.message });
    }
  }
}

export default ProfilesController;
