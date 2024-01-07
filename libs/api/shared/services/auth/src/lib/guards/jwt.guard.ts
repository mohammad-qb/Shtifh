import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@shtifh/user-service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Directly obtain the request object from the HTTP context
    const req = context.switchToHttp().getRequest();

    const token = this.getToken(req);
    if (!token) {
      throw new UnauthorizedException('No JWT token provided');
    } else {
      const decode = await this.userService.resources.jwt.verify(token);
      if (decode) {
        req.user = decode;
        return true;
      }
    }

    return false;
  }

  getToken(req: any): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

    return parts[1];
  }
}
