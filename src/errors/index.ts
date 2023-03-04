import { BadRequestException } from '@nestjs/common';

export class ValidationFailedException extends BadRequestException {
  constructor(failedValidations: Record<string, string>) {
    super({
      message: 'Bad Request',
      failedValidations,
    });
  }
}
