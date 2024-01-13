import { ApiProperty } from '@nestjs/swagger';
import { ServiceGroup } from '@prisma/client';
import { ServiceEntity } from './service.entity';
import { CarServiceEntity } from './car-service.entity';

export class ServiceGroupEntity implements ServiceGroup {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  price!: number;

  @ApiProperty()
  service!: ServiceEntity;

  @ApiProperty()
  car_services!: CarServiceEntity[];

  @ApiProperty()
  serviceId!: number;
}
