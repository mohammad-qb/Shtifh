import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@shtifh/jwt-service';
import { Payload } from './types/jwt.type';

@Injectable()
export class JwtResourceService {
  private logger = new Logger(JwtResourceService.name);

  constructor(private readonly jwtService: JwtService) {}

  async signJwt(payload: Payload, expire?: string) {
    return await this.jwtService.generateToken(payload, expire);
  }

  async verify(token: string) {
    return this.jwtService
      .verifyToken(token)
      .then((data) => data.payload as Payload)
      .catch((error: any) => {
        throw new UnauthorizedException('Unauthorized');
      });
  }
}
