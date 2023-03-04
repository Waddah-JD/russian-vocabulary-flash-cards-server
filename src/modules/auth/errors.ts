import { HttpStatus, UnauthorizedException } from '@nestjs/common';

const AuthErrorCodes = {
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  MISSING_TOKEN: 'MISSING_TOKEN',
  EXPIRED_TOKEN: 'EXPIRED_TOKEN',
  MALFORMED_TOKEN: 'MALFORMED_TOKEN',
};

// UNAUTHENTICATED (401): no token, token expired .. etc
export class UnauthenticatedRequestException extends UnauthorizedException {
  constructor(code?: string) {
    super({
      statusCode: HttpStatus.UNAUTHORIZED,
      error: 'Unauthenticated Request',
      code: code || AuthErrorCodes.UNAUTHENTICATED,
    });
  }
}

// UNAUTHORIZED (403): missing required 'groups'
export class UnauthorizedRequestException extends UnauthorizedException {
  constructor() {
    super({
      statusCode: HttpStatus.FORBIDDEN,
      error: 'Unauthorized Request',
      code: AuthErrorCodes.UNAUTHORIZED,
    });
  }
}

export class MissingTokenException extends UnauthenticatedRequestException {
  constructor() {
    super(AuthErrorCodes.MISSING_TOKEN);
  }
}

export class ExpiredTokenException extends UnauthenticatedRequestException {
  constructor() {
    super(AuthErrorCodes.EXPIRED_TOKEN);
  }
}

export class MalformedTokenException extends UnauthenticatedRequestException {
  constructor() {
    super(AuthErrorCodes.MALFORMED_TOKEN);
  }
}
