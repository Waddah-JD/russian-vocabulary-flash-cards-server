import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean as _IsBoolean,
  IsNotEmpty,
  IsString as _IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenericValidationErrorCodes } from 'src/errors/codes';

export function IsMandatory() {
  return applyDecorators(
    IsNotEmpty({ message: GenericValidationErrorCodes.IS_EMPTY }),
  );
}

export function IsLongerOrEqualTo(length: number) {
  return applyDecorators(
    MinLength(length, {
      message: GenericValidationErrorCodes.IS_LESS_THAN_MIN_LENGTH,
    }),
  );
}

export function IsShorterOrEqualTo(length: number) {
  return applyDecorators(
    MaxLength(length, {
      message: GenericValidationErrorCodes.IS_MORE_THAN_MAX_LENGTH,
    }),
  );
}

export function IsBoolean() {
  return applyDecorators(
    _IsBoolean({
      message: GenericValidationErrorCodes.IS_NOT_BOOLEAN,
    }),
  );
}

export function IsString() {
  return applyDecorators(
    _IsString({ message: GenericValidationErrorCodes.IS_NOT_STRING }),
  );
}
