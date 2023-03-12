import { UserValidationErrorCodes } from '@errors/codes';
import { applyDecorators } from '@nestjs/common';
import { IsEmail as _IsEmail } from 'class-validator';

import { IsLongerOrEqualTo, IsString } from './index';

export function IsEmail() {
  return applyDecorators(
    _IsEmail(undefined, {
      message: UserValidationErrorCodes.IS_NOT_VALID_EMAIL,
    }),
  );
}

export function IsFirebaseUid() {
  // TODO use RegEx
  return applyDecorators(IsString(), IsLongerOrEqualTo(10));
}
