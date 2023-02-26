export function getEnvFileExtension(env?: string) {
  switch (env) {
    case 'test':
      return 'test';
    case 'production':
      return 'prod';
    case 'development':
    default:
      return 'dev';
  }
}
