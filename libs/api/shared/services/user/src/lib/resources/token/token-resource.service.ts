import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@shtifh/jwt-service';
import { UserPayload } from './types/user-token.type';

@Injectable()
export class TokenResourceService {
  private logger = new Logger(TokenResourceService.name);

  constructor(private readonly jwtService: JwtService) {}

  async generate(args: UserPayload) {
    return await this.jwtService.generateToken(args, '15m');
  }

  async verify(token: string) {
    this.logger.log('Verifying token:', token);
    return this.jwtService
      .verifyToken(token)
      .then((data) => {
        this.logger.log('Verification data:', data);
        return data.payload as UserPayload;
      })
      .catch((error) => {
        this.logger.error('Token verification failed:', error);
        throw new UnauthorizedException('Unauthorized', error);
      });
  }
}
