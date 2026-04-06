import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { RedisModule } from '../redis/redis.module';
import { SharedModule } from '../shared/shared.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    RedisModule,
    SharedModule,
    MailModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.SECRET_KEY,
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
