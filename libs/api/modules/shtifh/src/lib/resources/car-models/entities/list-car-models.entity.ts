import { ApiProperty } from '@nestjs/swagger';

class CarModelsDateEntity {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  name!: string;
}

export class ListCarModelsEntity {
  @ApiProperty({ type: CarModelsDateEntity, isArray: true })
  results!: CarModelsDateEntity[];
}
