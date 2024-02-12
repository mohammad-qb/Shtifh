import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { CarEntity } from '@shtifh/entities';

class NestedCarEntity
  implements Pick<CarEntity, 'color' | 'id' | 'plate' | 'name' | 'year'>
{
  @ApiProperty({ enum: $Enums.CarColor })
  color!: $Enums.CarColor;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  model_name!: string;

  @ApiProperty({ nullable: true })
  plate!: string | null;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  year!: number;

  @ApiProperty()
  city!: string;
}

export class ListCarEntity {
  @ApiProperty({ type: [NestedCarEntity] })
  result!: NestedCarEntity[];
}
