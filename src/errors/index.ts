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
  constructor(
    entity: string,
    ...args: { value: string | number; property?: string }[]
  ) {
    super({
      message: 'Entity Not found',
      description:
        args.length > 0
          ? `No ${entity} with ${args
              .map(({ property, value }) => `${property || 'ID'} = ${value}`)
              .join(', ')} was found`
          : `No ${entity} was found`,
    });
  }
}
