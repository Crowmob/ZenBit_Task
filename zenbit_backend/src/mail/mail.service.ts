import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendVerificationEmail(to: string, token: string) {
    const url = `${process.env.APP_URL}/auth/verify?token=${token}`;

    await this.mailerService.sendMail({
      to,
      subject: 'Verify your email',
      html: `
        <h2>Email Verification</h2>
        <p>Click below to verify:</p>
        <p>${url}</p>
      `,
    });
  }
  async sendResetPasswordEmail(to: string, token: string) {
    const url = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

    await this.mailerService.sendMail({
      to,
      subject: 'Reset your password',
      html: `
        <h2>Reset your password</h2>
        <p>Click below to reset your password:</p>
        <p>${url}</p>
      `,
    });
  }
}
