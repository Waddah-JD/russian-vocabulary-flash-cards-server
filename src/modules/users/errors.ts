import { UserValidationErrorCodes } from '@errors/codes';
import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor() {
    super(
      {
        statusCode: HttpStatus.NOT_ACCEPTABLE,
        error: 'User already exists',
        code: UserValidationErrorCodes.USER_ALREADY_EXISTS,
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
