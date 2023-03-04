import { IsEmail, IsFirebaseUid } from 'src/validators/users';

import { User } from './entities';

export class CreateUserDto {
  @IsFirebaseUid()
  id: User['id'];

  @IsEmail()
  email: User['email'];
}
