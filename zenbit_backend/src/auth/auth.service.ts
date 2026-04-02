import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from 'src/dto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(authUserDto: AuthUserDto) {
    return this.usersService.create(authUserDto);
  }

  async register(id: number) {
    return this.usersService.findUserById(id);
  }
}
