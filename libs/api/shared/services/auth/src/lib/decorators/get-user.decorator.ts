import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Payload } from '@shtifh/user-service';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): Payload | undefined => {
    // Access the HTTP request object
    const req = context.switchToHttp().getRequest();
    return req.user as Payload; // Access user data from the request
  }
);
