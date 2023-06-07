import { User } from '@modules/users/entities';
import { Request } from 'express';

export type RequestWithUserId = Request & { userId?: User['id'] };
