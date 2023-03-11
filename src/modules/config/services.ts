import { Injectable } from '@nestjs/common';
import { ConfigService as BaseConfigService } from '@nestjs/config';

import { Config } from './types';

@Injectable()
export class ConfigService {
  constructor(private baseConfig: BaseConfigService) {}

  getConfig(): Config {
    return {
      environment: this.baseConfig.get('NODE_ENV', 'development'),
      port: this.baseConfig.get('PORT', 3000),

      tz: this.baseConfig.get('TZ', 'UTC'),

      db: {
        host: this.baseConfig.get('DB_HOST', ''),
        port: this.baseConfig.get('DB_PORT', 5432),
        username: this.baseConfig.get('DB_USERNAME', ''),
        password: this.baseConfig.get('DB_PASSWORD', ''),
        name: this.baseConfig.get('DB_NAME', ''),
      },

      firebase: {
        projectId: this.baseConfig.get('FIREBASE_PROJECT_ID', ''),
        clientEmail: this.baseConfig.get('FIREBASE_CLIENT_EMAIL', ''),
        privateKey: this.baseConfig
          .get('FIREBASE_PRIVATE_KEY', '')
          .replace(/\\n/g, '\n'),
      },

      cache: {
        host: this.baseConfig.get('REDIS_HOST', ''),
        port: this.baseConfig.get('REDIS_PORT', 6379),
        password: this.baseConfig.get('REDIS_PASSWORD', ''),
        ttl: this.baseConfig.get('CACHE_TTL', 1000),
      },
    };
  }
}
