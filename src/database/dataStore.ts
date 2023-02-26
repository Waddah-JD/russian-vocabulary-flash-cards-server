import { ConfigService } from '@modules/config/services';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

function getDataStoreFactory(
  configService: ConfigService,
): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
  return {
    type: 'postgres' as const,
    host: configService.getConfig().db.host,
    port: configService.getConfig().db.port,
    username: configService.getConfig().db.username,
    password: configService.getConfig().db.password,
    database: configService.getConfig().db.name,
    entities: [join(__dirname, '..', 'modules', '**', 'entities.ts')],
    migrationsTableName: 'migrations',
    migrationsRun: false,
    migrations: [join(__dirname, 'migrations', '**/*')],
    synchronize: false,
    autoLoadEntities: true,
  };
}

export default getDataStoreFactory;
