import { Inject, Injectable, Logger } from '@nestjs/common';
import { SignJWT, jwtVerify } from 'jose';
import { EnvService } from '@shtifh/env-service';

@Injectable()
export class JwtService {
  private logger = new Logger(JwtService.name);
  @Inject(EnvService)
  private readonly envService!: EnvService;

  async generateToken(payload: any, expire?: string) {
    const privateKey = new TextEncoder().encode(
      this.envService.get('JWT_SECRET_KEY')
    );
    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(this.envService.get('JWT_ISSUER_KEY'))
      .setAudience(this.envService.get('JWT_AUDIENCE_KEY'))
      .setExpirationTime(expire || '30d')
      .sign(privateKey);
    return jwt;
  }

  async verifyToken(token: string) {
    const privateKey = new TextEncoder().encode(
      this.envService.get('JWT_SECRET_KEY')
    );
    return await jwtVerify(token, privateKey);
  }
}
