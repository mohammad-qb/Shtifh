import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomerResourceService } from './customer-resource.service';
import { Logger } from '@nestjs/common';
import { CreateCustomerInput } from './dtos/create-customer.dto';
import { GqlLang, HeaderLanguage } from '@shtifh/decorators';

@Resolver()
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
}
