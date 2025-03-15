import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerResourceService } from './customer-resource.service';
import { Logger, UseGuards } from '@nestjs/common';
import { CreateCustomerInput } from './inputs/create-customer.input';
import { GqlLang, GqlUser, HeaderLanguage } from '@shtifh/decorators';
import { UpdateCustomerInput } from './inputs/update-customer.input';
import { UserPayload } from '@shtifh/user-service';
import { JwtAuthGuard } from '@shtifh/auth-service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CustomerResourceResolver {
  private logger = new Logger(CustomerResourceResolver.name);

  constructor(
    private readonly CustomerResourceService: CustomerResourceService
  ) {}

  @Mutation(() => Boolean, { name: 'createCustomer' })
  async createCustomer(
    @Args('CreateCustomerInput') input: CreateCustomerInput,
    @GqlLang() lang: HeaderLanguage
  ) {
    return await this.CustomerResourceService.create(lang, input);
  }

  @Mutation(() => Boolean, { name: 'updateCustomer' })
  async updateCustomer(
    @Args('UpdateCustomerInput') input: UpdateCustomerInput,
    @GqlLang() lang: HeaderLanguage,
    @GqlUser() user: UserPayload
  ) {
    return await this.CustomerResourceService.update(user.userId, lang, input);
  }
}
