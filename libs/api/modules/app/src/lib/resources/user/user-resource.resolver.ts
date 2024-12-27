import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserResourceService } from './user-resource.service';
import { Logger } from '@nestjs/common';
import { LoginInput } from './inputs/login.input';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UserPayload } from '@shtifh/user-service';
import { AuthUserEntity } from './entities/auth-user.entity';
import { ForgetPasswordInput } from './inputs/forget-password.input';
import { ResetPasswordInput } from './inputs/reset-password.input';
import { VerifyResetPasswordOtpInput } from './inputs/verify-reset-password-otp.input';
import { ChangePasswordInput } from './inputs/change-password.input';

@Resolver()
export class UserResourceResolver {
  private logger = new Logger(UserResourceResolver.name);

  constructor(private readonly UserResourceService: UserResourceService) {}

  @Mutation(() => AuthUserEntity, { name: 'login' })
  async login(
    @Args('LoginInput') input: LoginInput,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.UserResourceService.login(input, lang);
  }

  @Mutation(() => Boolean, { name: 'forgetPassword' })
  async forgetPassword(
    @Args('ForgetPasswordInput') input: ForgetPasswordInput,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.UserResourceService.forgetPassword(input.email, lang);
  }

  @Mutation(() => Boolean, { name: 'resetPassword' })
  async resetPassword(
    @Args('ResetPasswordInput') input: ResetPasswordInput,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.UserResourceService.resetPassword(input, lang);
  }

  @Mutation(() => Boolean, { name: 'verifyResetPasswordOtp' })
  async verifyResetPasswordOtp(
    @Args('VerifyResetPasswordOtpInput') input: VerifyResetPasswordOtpInput,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.UserResourceService.verifyResetPasswordOtp(input, lang);
  }

  @Mutation(() => Boolean, { name: 'changePassword' })
  async changePassword(
    @Args('ChangePasswordInput') input: ChangePasswordInput,
    @GqlLang() lang: HeaderLanguage,
    @GqlUser() user: UserPayload
  ) {
    return await this.UserResourceService.changePassword(
      user.userId,
      input,
      lang
    );
  }

  @Query(() => AuthUserEntity, { name: 'me' })
  async me(@GqlUser() user: UserPayload, @GqlLang() lang: HeaderLanguage) {
    return await this.UserResourceService.me(user.userId, lang);
  }
}
