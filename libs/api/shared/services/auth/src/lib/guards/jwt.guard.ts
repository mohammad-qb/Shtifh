import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { IS_OPTIONAL_KEY } from '@shtifh/decorators';
import { UserService } from '@shtifh/user-service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger(JwtAuthGuard.name);

  constructor(
    private readonly userService: UserService,
    private reflector: Reflector
  ) {
    super();
  }

  override async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const isOptional = this.reflector.get<boolean>(
      IS_OPTIONAL_KEY,
      context.getHandler()
    );

    const token = this.getToken(req);
    if (!token) {
      if (isOptional) {
        return true; // Proceed without a user
      } else {
        throw new UnauthorizedException('No JWT token provided');
      }
    }

    try {
      const decode = await this.userService.verifyToken(token);
      req.user = decode;
      return true;
    } catch (error) {
      if (isOptional) {
        return true; // Proceed without a user if token is invalid
      } else {
        console.log({ error });
        throw new UnauthorizedException('Invalid token');
      }
    }
  }

  getToken(req: any): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;

    return parts[1];
  }
}
