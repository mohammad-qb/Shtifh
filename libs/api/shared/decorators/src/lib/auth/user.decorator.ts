import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserPayload } from '@shtifh/user-service';

export const GqlUser = createParamDecorator(
  <K extends keyof UserPayload>(
    data: K | null,
    context: ExecutionContext
  ): UserPayload[K] | UserPayload | undefined => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as UserPayload;

    return data ? user[data] : user;
  }
);
