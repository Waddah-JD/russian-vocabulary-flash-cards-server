import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { ExpiredTokenException, MissingTokenException } from './errors';
import { AuthService } from './services';

function mapFirebaseAuthToAuthErrors(e: { errorInfo: { code: string } }) {
  console.log(e.errorInfo);
  switch (e.errorInfo.code) {
    case 'auth/id-token-expired':
      throw new ExpiredTokenException();

    default:
      // TODO catch and handle
      console.log(e.errorInfo.code);
  }
}

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request || !request.headers || !request.headers.authorization) {
      throw new MissingTokenException();
    }

    const token = request.headers.authorization.split('Bearer ')[1];
    if (!token) throw new MissingTokenException();

    try {
      const { uid, email } = await this.authService.decodeAuthToken(token);
      request.user = { uid, email };
      return true;
    } catch (e) {
      mapFirebaseAuthToAuthErrors(e);
    }
  }
}
