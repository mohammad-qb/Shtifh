import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@shtifh/jwt-service';
import { UserPayload } from './types/jwt.type';

@Injectable()
export class JwtResourceService {
  private logger = new Logger(JwtResourceService.name);

  constructor(private readonly jwtService: JwtService) {}

  async signJwt(payload: UserPayload, expire?: string) {
    return await this.jwtService.generateToken(payload, expire);
  }

  async verify(token: string) {
    return this.jwtService
      .verifyToken(token)
      .then((data) => data.payload as UserPayload)
      .catch((error) => {
        this.logger.error('Unauthorized', error.message);
        throw new UnauthorizedException('Unauthorized', error.message);
      });
  }
}
