import { Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AdminStatisticsResourceService } from './statistics-resource.service';

@Resolver()
export class AdminStatisticsResourceResolver {
  private logger = new Logger(AdminStatisticsResourceResolver.name);

  constructor(
    private readonly adminStatisticsResourceService: AdminStatisticsResourceService
  ) {}
}
