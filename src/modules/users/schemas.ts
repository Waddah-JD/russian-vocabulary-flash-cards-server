import { IsString } from '@validators/index';

export class CreateUserByIdTokenDto {
  @IsString()
  idToken: string;
}
