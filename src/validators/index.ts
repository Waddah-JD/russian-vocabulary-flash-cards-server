import { applyDecorators } from '@nestjs/common';
import {
  IsBoolean as _IsBoolean,
  IsBooleanString as _IsBooleanString,
  IsEnum as _IsEnum,
  IsNotEmpty,
  IsNumber as _IsNumber,
  IsString as _IsString,
  Matches,
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

export function IsBooleanString() {
  return applyDecorators(
    _IsBooleanString({
      message: GenericValidationErrorCodes.IS_NOT_BOOLEAN_STRING,
    }),
  );
}

export function IsString() {
  return applyDecorators(
    _IsString({ message: GenericValidationErrorCodes.IS_NOT_STRING }),
  );
}

export function IsNumericString() {
  return applyDecorators(
    Matches(/^\d+$/, {
      message: GenericValidationErrorCodes.IS_NOT_NUMERIC_STRING,
    }),
  );
}

export function IsNumber() {
  return applyDecorators(
    _IsNumber(
      { allowInfinity: false, allowNaN: false },
      { message: GenericValidationErrorCodes.IS_NOT_NUMBER },
    ),
  );
}

export function IsEnumValue(enumObj: object) {
  return applyDecorators(
    _IsEnum(enumObj, {
      message: GenericValidationErrorCodes.IS_NOT_VALID_ENUM_VALUE,
    }),
  );
}
