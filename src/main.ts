import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/app';
import { ConfigService } from '@modules/config/service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = app.get(ConfigService).getConfig().port;
  await app.listen(PORT);
}
bootstrap();
