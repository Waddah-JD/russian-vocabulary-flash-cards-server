import { IsEmail, IsFirebaseUid } from '@validators/users';

import { User } from './entities';

export class CreateUserDto {
  @IsFirebaseUid()
  id: User['id'];

  @IsEmail()
  email: User['email'];
}
