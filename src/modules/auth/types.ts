import { Request } from 'express';

export type AuthenticatedRequest = Request & {
  user: { uid: string; email: string };
};
