import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HeaderLanguage } from './lang.type';

export const GqlLang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): HeaderLanguage => {
    const gqlCtx = GqlExecutionContext.create(ctx).getContext();
    const lang : HeaderLanguage | undefined = gqlCtx.req.headers['accept-language'];
    return lang || 'en';
  },
);