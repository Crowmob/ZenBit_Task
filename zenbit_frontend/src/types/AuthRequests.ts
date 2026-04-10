export class AuthRequest {
  email!: string;
  password!: string;
  fingerprint!: string;
}

export class ForgotPasswordRequest {
  email!: string
}

export class VerifyUserRequest {
  token!: string;
  fingerprint!: string
}

export class ResetPasswordRequest{
  token!: string;
  newPassword!: string;
}