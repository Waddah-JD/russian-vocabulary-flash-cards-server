import { applyDecorators, UseGuards } from '@nestjs/common';

import { AuthenticationGuard } from './guard';

export function UseAuthenticationGuard() {
  return applyDecorators(UseGuards(AuthenticationGuard));
}
