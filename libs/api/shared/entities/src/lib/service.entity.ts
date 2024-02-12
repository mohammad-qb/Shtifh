import { ApiProperty } from '@nestjs/swagger';
import { Service } from '@prisma/client';

export class ServiceEntity implements Service {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_he!: string;
}
