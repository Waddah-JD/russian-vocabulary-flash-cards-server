export function getEnvFileExtension(env: string) {
  switch (env) {
    case 'test':
      return '.test';
    case 'development':
      return '.dev';
    case 'production':
    default:
      return '';
  }
}
