import {
  ForbiddenException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthUserDto } from '../dto/auth-user.dto';
import { HashService } from '../shared/services/hash.service';
import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async login(authUserDto: AuthUserDto, res: Response) {
    const user = await this.usersService.findUserByEmail(authUserDto.email);
    if (!user.isVerified) {
      throw new ForbiddenException('Email not verified');
    }
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
      await this.redisService.set(`session:${user.id}`, value, 3600);
      const token = this.jwtService.sign({ userId: user.id });
      res.cookie('accessToken', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600 * 1000,
      });
    }
  }

  async register(authUserDto: AuthUserDto) {
    authUserDto.password = await this.hashService.hash(authUserDto.password);
    let userId: number | undefined;
    try {
      userId = await this.usersService.create(authUserDto);
    } catch (error) {
      if (error instanceof HttpException && error.getStatus() === 409) {
        userId = (await this.usersService.findUserByEmail(authUserDto.email))
          .id;
      } else {
        throw error;
      }
    }
    const token = this.jwtService.sign({ userId });
    await this.mailService.sendVerificationEmail(authUserDto.email, token);
  }

  async logout(req: Request, res: Response) {
    const accessToken = req.cookies['accessToken'] as string;
    if (accessToken) {
      try {
        const payload: { userId: string } = this.jwtService.verify(accessToken);
        await this.redisService.del(`session:${payload.userId}`);
        res.clearCookie('accessToken', {
          httpOnly: true,
          sameSite: 'strict',
        });
      } catch {
        res.clearCookie('accessToken', {
          httpOnly: true,
          sameSite: 'strict',
        });
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
        res.clearCookie('accessToken', {
          httpOnly: true,
          sameSite: 'strict',
        });
        throw new UnauthorizedException('Invalid token');
      }
      const user = await this.usersService.findUserById(
        Number(payload?.userId),
      );
      const session = await this.redisService.get(`session:${payload?.userId}`);
      if (session) {
        if (
          new Date(session.refreshTime) > new Date() &&
          session.fingerprint === fingerprint
        ) {
          return user;
        } else {
          await this.redisService.del(`session:${payload?.userId}`);
        }
      }
    }
    res.clearCookie('accessToken', {
      httpOnly: true,
      sameSite: 'strict',
    });
    throw new UnauthorizedException('Session expired');
  }

  async verifyEmail(token: string, res: Response, fingerprint: string) {
    let payload: { userId: string };
    try {
      payload = this.jwtService.verify<{ userId: string }>(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    await this.usersService.update(Number(payload.userId), {
      isVerified: true,
    });
    const value = {
      createdAt: new Date().toISOString(),
      expireTime: new Date(Date.now() + 3600 * 1000).toISOString(),
      refreshTime: new Date(Date.now() + 3600 * 24 * 1000).toISOString(),
      fingerprint,
    };
    await this.redisService.set(`session:${payload.userId}`, value, 3600);
    res.cookie('accessToken', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600 * 1000,
    });
  }

  async resetPasswordRequest(email: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user.isVerified) {
      throw new ForbiddenException('Email not verified');
    }
    const token = this.jwtService.sign({ email });
    await this.mailService.sendResetPasswordEmail(email, token);
  }

  async resetPassword(token: string, newPassword: string) {
    let payload: { email: string };
    try {
      payload = this.jwtService.verify<{ email: string }>(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    const user = await this.usersService.findUserByEmail(payload.email);
    if (!user.isVerified) {
      throw new ForbiddenException('Email not verified');
    }
    const hashedPassword = await this.hashService.hash(newPassword);
    await this.usersService.update(user.id, { password: hashedPassword });
  }
}
