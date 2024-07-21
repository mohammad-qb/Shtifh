import { ApiProperty } from '@nestjs/swagger';

export class ServiceEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_he!: string;
}
