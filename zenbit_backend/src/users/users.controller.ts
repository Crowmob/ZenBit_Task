import { Controller, Get, Query, Req } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  async me(@Query('fingerprint') fingerprint: string, @Req() req: Request) {
    const user = await this.authService.me(fingerprint, req);
    return { email: user.email };
  }
}
