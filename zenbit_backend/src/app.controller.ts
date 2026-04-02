import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  async login(@Body() authUserDto: AuthUserDto): Promise<number | undefined> {
    return this.authService.login(authUserDto);
  }

  @Post('register')
  async register(@Body() body: { id: number }): Promise<User | null> {
    return this.authService.register(body.id);
  }
}
