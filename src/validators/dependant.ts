import {
  registerDecorator,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNil } from 'lodash';
import { GenericValidationErrorCodes } from 'src/errors/codes';

@ValidatorConstraint({ async: false })
class DependantOnProperty<T> implements ValidatorConstraintInterface {
  validate(_: T, args: ValidationArguments) {
    return !isNil(args.object[args.constraints[0]]);
  }
}

export function IsDependantOnProperty(dependencies: string) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: GenericValidationErrorCodes.ONE_OF_THE_DEPENDENCIES_IS_MISSING,
      },
      constraints: [dependencies],
      validator: DependantOnProperty,
    });
  };
}
