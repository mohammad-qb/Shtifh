import { ApiProperty } from '@nestjs/swagger';

class ListCarModelsDataByCityEntity {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  name_he!: string;
}

class ListCarModelsByCity {
  @ApiProperty({ type: ListCarModelsDataByCityEntity })
  car_model!: ListCarModelsDataByCityEntity;
}

export class ListCarModelsByCityEntity {
  @ApiProperty({ type: ListCarModelsByCity, isArray: true })
  result!: ListCarModelsByCity[];
}
