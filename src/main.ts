import { AppModule } from '@modules/app';
import { ConfigService } from '@modules/config/services';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ValidationFailedException } from './errors';

async function bootstrap() {
  // TODO should disable CORS on production (there are a couple of public-facing endpoints though)?
  const app = await NestFactory.create(AppModule, { cors: true });

  const PORT = app.get(ConfigService).getConfig().port;

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const validationIssues: Record<string, string> = {};
        for (const error of errors) {
          const { property, constraints } = error;
          validationIssues[property] = Object.values(constraints)[0];
        }
        return new ValidationFailedException(validationIssues);
      },
    }),
  );
  await app.listen(PORT);
}
bootstrap();
