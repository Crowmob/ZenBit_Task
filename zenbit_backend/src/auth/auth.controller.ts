import { Body, Controller, Post, Put, Req, Res } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import type { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: AuthUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.login(body, res);
    return { message: `User with ${body.email} logged in successfully` };
  }

  @Post('register')
  async register(@Body() body: AuthUserDto) {
    await this.authService.register(body);
    return { message: `Verification email sent to ${body.email}` };
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    await this.authService.logout(req, res);
    return { message: 'User logged out successfully' };
  }

  @Put('verify')
  async verifyEmail(
    @Body() body: { token: string; fingerprint: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.verifyEmail(body.token, res, body.fingerprint);
    return { message: 'Email verified successfully' };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    await this.authService.resetPasswordRequest(body.email);
    return { message: 'Password reset email sent successfully' };
  }

  @Put('reset-password')
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    await this.authService.resetPassword(body.token, body.newPassword);
    return { message: 'Password reset successfully' };
  }
}
