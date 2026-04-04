import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import type { Response, Request } from 'express';

@Controller()
export class AppController {
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

  @Post('login')
  async login(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(body, res);
    return { message: `User with ${body.email} logged in successfully` };
  }

  @Post('register')
  async register(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.register(body, res);
    return { message: `User with ${body.email} registered successfully` };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req, res);
    return { message: 'User logged out successfully' };
  }
}
