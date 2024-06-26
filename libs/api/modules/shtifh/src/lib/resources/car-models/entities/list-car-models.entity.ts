import { ApiProperty } from '@nestjs/swagger';

class CarModelsDateEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  image_url!: string;

  @ApiProperty()
  name!: string;
}

export class ListCarModelsEntity {
  @ApiProperty({ type: CarModelsDateEntity, isArray: true })
  results!: CarModelsDateEntity[];
}
