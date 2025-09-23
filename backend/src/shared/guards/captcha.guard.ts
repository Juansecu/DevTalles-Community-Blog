import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class CaptchaGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const captchaToken = request.header('X-Captcha-Token');
    const captchaVerificationURL =
      'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const clientIp: string | undefined =
      request.header('CF-Connecting-IP') || request.ip;

    if (
      !captchaToken ||
      Array.isArray(captchaToken) ||
      captchaToken.trim() === ''
    ) {
      Logger.error('Captcha token is missing or invalid', CaptchaGuard.name);
      return false;
    }

    await fetch(captchaVerificationURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        secret: this.configService.get<string>('CAPTCHA_SECRET_KEY'),
        response: captchaToken,
        remoteip: clientIp || ''
      })
    })
      .then(res => res.json())
      .then(data => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (!data.success) {
          Logger.error(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            `Captcha verification failed: ${JSON.stringify(data['error-codes'])}`,
            CaptchaGuard.name
          );

          throw new Error('Captcha verification failed');
        }
      })
      .catch(error => {
        Logger.error(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          `Error during captcha verification: ${error.message}`,
          CaptchaGuard.name
        );

        throw new Error('Error during captcha verification');
      });

    return true;
  }
}
