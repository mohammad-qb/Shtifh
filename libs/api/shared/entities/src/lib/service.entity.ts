import { ApiProperty } from '@nestjs/swagger';
import { Service } from '@prisma/client';

export class ServiceEntity implements Service {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;
}
