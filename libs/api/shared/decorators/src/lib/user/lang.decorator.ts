import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { HeaderLang } from './types/user-decorators.type';

export const Lang = createParamDecorator(
  (data: unknown, context: ExecutionContext): HeaderLang => {
    const req = context.switchToHttp().getRequest();
    const lang = (req.headers['lang'] as HeaderLang) || 'en'; // Access user data from the request
    return lang;
  }
);
