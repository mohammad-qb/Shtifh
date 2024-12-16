import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { HeaderLanguage } from './lang.type';

const validLanguages: HeaderLanguage[] = ['en', 'ar', 'he']; // Add your valid HeaderLanguage values here.

export const GqlLang = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): HeaderLanguage => {
    const gqlCtx = GqlExecutionContext.create(ctx).getContext();
    const acceptLanguage: string | undefined =
      gqlCtx.req.headers['accept-language'];

    if (acceptLanguage) {
      // Extract the first language from the `accept-language` header.
      const parsedLang = acceptLanguage.split(',')[0].split('-')[0]; // Get the language before any dash or comma.

      // Check if it's a valid HeaderLanguage; if not, default to 'en'.
      if (validLanguages.includes(parsedLang as HeaderLanguage)) {
        return parsedLang as HeaderLanguage;
      }
    }

    return 'en'; // Default to 'en' if no valid language is found.
  }
);
