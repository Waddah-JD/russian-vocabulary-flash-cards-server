import { AuthService } from '@modules/auth/services';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { RequestWithUserId } from 'src/types';

/**
 * as opposed to the AuthenticationGuard, this middleware is used to perform a check on an optional token,
 * in other words; the endpoint is not forbidden for unauthenticated users, but being authenticated adds extra possibilities
 * for example:
 * when searching for a word, if a user is authenticated, then a search on their collection will be performed
 * in order to fetch their notes on the word (and how many times they have practiced the word whether successfully or not)
 * if they are not authenticated, then a search will return a user-agnostic value
 */
@Injectable()
export class ExtractUserIdFromTokenMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: RequestWithUserId, res: Response, next: NextFunction) {
    if (!req || !req.headers || !req.headers.authorization) {
      return next();
    }

    const token = req.headers.authorization.split('Bearer ')[1];
    if (!token) {
      return next();
    }

    try {
      const { uid } = await this.authService.decodeAuthToken(token);
      req.userId = uid;
    } catch (error) {
      console.error(error); // no further handling is needed since this is for optional UID extract but still logging the issue since it shouldn't happen
    } finally {
      next();
    }
  }
}
