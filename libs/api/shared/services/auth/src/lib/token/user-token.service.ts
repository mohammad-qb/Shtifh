import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@shtifh/jwt-service';
import { UserPayload } from '@shtifh/user-service';

@Injectable()
export class UserTokenService {
  private logger = new Logger(UserTokenService.name);

  constructor(private readonly jwtService: JwtService) {}

  async generate(args: UserPayload) {
    return await this.jwtService.generateToken(args, '15m');
  }

  verify(token: string) {
    return this.jwtService
      .verifyToken(token)
      .then((data) => data.payload as UserPayload)
      .catch((error) => {
        throw new UnauthorizedException('Unauthorized', error);
      });
  }
}
