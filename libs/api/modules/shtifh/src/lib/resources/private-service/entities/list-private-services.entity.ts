import { ApiProperty } from '@nestjs/swagger';

export class ListPrivateServicesEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name_he!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_ar!: string;
}
