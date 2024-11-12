import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserResourceService } from "./user-resource.service";
import { Logger } from "@nestjs/common";
import { LoginInput } from "./dtos/login.dto";
import { GqlLang, GqlUser, HeaderLanguage } from "@shtifh/decorators";
import { UserPayload } from "@shtifh/user-service";
import { AuthUserEntity } from "./entities/auth-user.entity";

@Resolver()
export class UserResourceResolver {
  private logger = new Logger(UserResourceResolver.name);

  constructor(private readonly UserResourceService: UserResourceService) {}

  @Mutation(() => AuthUserEntity, {name: 'login'})
  async login(@Args('LoginInput') input: LoginInput, @GqlLang() lang: HeaderLanguage) {
    return await this.UserResourceService.login(input, lang);
  }

  @Query(() => AuthUserEntity, {name: 'me'})
  async me(@GqlUser() user: UserPayload, @GqlLang() lang: HeaderLanguage) {
    return await this.UserResourceService.me(user.userId, lang);
  }
}
