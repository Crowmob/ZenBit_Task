import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendVerificationEmail(email: string, token: string) {
    const verifyUrl = `${process.env.API_URL}/verify/${token}`;

    return await this.resend.emails.send({
      from: 'onboarding@resend.dev', // or your verified domain
      to: email,
      subject: 'Verify your email',
      html: `
        <h2>Welcome 👋</h2>
        <p>Click below to verify your email:</p>
        <a href="${verifyUrl}">Verify Email</a>
      `,
    });
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const resetPasswordUrl = `${process.env.API_URL}/reset-password/${token}`;

    return await this.resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'ResetYourPassword',
      html: `
        <h2>Welcome 👋</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetPasswordUrl}">Reset password</a>
      `,
    });
  }
}
