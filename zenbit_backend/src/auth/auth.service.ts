import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from 'src/dto/auth-user.dto';
import { HashService } from 'src/shared/services/hash.service';
import { RedisService } from 'src/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly redisService: RedisService,
    private jwtService: JwtService,
  ) {}

  async login(authUserDto: AuthUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(authUserDto.email);
    if (
      user &&
      (await this.hashService.compare(authUserDto.password, user.password))
    ) {
      const session = await this.redisService.get(`session:${user.id}`);
      const value = {
        createdAt: session ? session.createdAt : new Date().toISOString(),
        expireTime: new Date(Date.now() + 3600 * 1000).toISOString(),
        refreshTime: session
          ? session.refreshTime
          : new Date(Date.now() + 3600 * 24 * 1000).toISOString(),
        fingerprint: authUserDto.fingerprint,
      };
      await this.redisService.set(`session:${user.id}`, value);
      const token = this.jwtService.sign({ userId: user.id });
      res.cookie('accessToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600 * 1000,
      });
    }
  }

  async register(authUserDto: AuthUserDto, res: Response) {
    authUserDto.password = await this.hashService.hash(authUserDto.password);
    const userId = await this.usersService.create(authUserDto);
    if (userId) {
      const value = {
        createdAt: new Date().toISOString(),
        refreshTime: new Date(Date.now() + 3600 * 24 * 1000).toISOString(),
        fingerprint: authUserDto.fingerprint,
      };
      await this.redisService.set(`session:${userId}`, value);
      const token = this.jwtService.sign({ userId });
      res.cookie('accessToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600 * 1000,
      });
    }
  }

  async logout(req: Request, res: Response) {
    const accessToken = req.cookies['accessToken'] as string;
    if (accessToken) {
      try {
        const payload: { userId: string } = this.jwtService.verify(accessToken);
        await this.redisService.del(`session:${payload.userId}`);
        res.clearCookie('accessToken');
      } catch {
        res.clearCookie('accessToken');
      }
    }
  }

  async me(fingerprint: string, req: Request, res: Response) {
    const accessToken = req.cookies['accessToken'] as string;
    if (accessToken) {
      let payload: { userId: string } | undefined = undefined;
      try {
        payload = this.jwtService.verify<{ userId: string }>(accessToken);
      } catch {
        res.clearCookie('accessToken');
        throw new UnauthorizedException('Invalid token');
      }
      const user = await this.usersService.findUserById(
        Number(payload?.userId),
      );
      const session = await this.redisService.get(`session:${payload?.userId}`);
      if (session) {
        if (
          session.refreshTime > new Date(Date.now()) ||
          session.fingerprint === fingerprint
        ) {
          return user;
        } else {
          await this.redisService.del(`session:${payload?.userId}`);
        }
      }
    }
    res.clearCookie('accessToken');
    throw new UnauthorizedException('Session expired');
  }
}
