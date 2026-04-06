import { Body, Controller, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Get('health')
  healthCheck() {
    return { status: 'OK' };
  }
}
