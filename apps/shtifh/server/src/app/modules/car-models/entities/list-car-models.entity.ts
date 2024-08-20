import { ApiProperty } from '@nestjs/swagger';

class CarModelsDateEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  image_url!: string;

  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_he!: string;
}

export class ListCarModelsEntity {
  @ApiProperty({ type: CarModelsDateEntity, isArray: true })
  results!: CarModelsDateEntity[];
}
