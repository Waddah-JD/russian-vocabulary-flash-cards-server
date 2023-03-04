export interface Config {
  environment: 'development' | 'production' | 'test';
  port: number;

  tz: string;

  db: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
  };

  firebase: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  };
}
