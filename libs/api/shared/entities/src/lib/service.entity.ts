import { ApiProperty } from '@nestjs/swagger';
import { Service } from '@prisma/client';
import { ServiceGroupEntity } from './service-group.entity';

export class ServiceEntity implements Service {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  service_groups!: ServiceGroupEntity[];
}
