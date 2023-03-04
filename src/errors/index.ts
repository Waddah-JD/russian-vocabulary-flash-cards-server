import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ValidationFailedException extends BadRequestException {
  constructor(failedValidations: Record<string, string>) {
    super({
      message: 'Bad Request',
      failedValidations,
    });
  }
}

export class ResourceNotFoundException extends NotFoundException {
  constructor(entity: string, value: string, property = 'ID') {
    super({
      message: 'Entity Not found',
      description: `no ${entity} with ${property} = ${value} was not found`,
    });
  }
}
