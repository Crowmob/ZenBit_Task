import { Body, Controller, Get, Req, Res } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  async me(
    @Body('fingerprint') fingerprint: string,
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
  ) {
    const user = await this.authService.me(fingerprint, req, res);
    return { email: user.email };
  }
}
