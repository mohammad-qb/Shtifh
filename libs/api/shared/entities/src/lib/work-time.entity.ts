import { ApiProperty } from '@nestjs/swagger';
import { $Enums, WorkTime } from '@prisma/client';
import { CityEntity } from './city.entity';

export class WorkTimeEntity implements WorkTime {
  @ApiProperty()
  cityId!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty({ enum: $Enums.Day })
  day!: $Enums.Day;

  @ApiProperty()
  start_time!: string;

  @ApiProperty()
  end_time!: string;

  @ApiProperty()
  employees_to_work!: number[];

  @ApiProperty()
  is_day_off!: boolean;

  @ApiProperty()
  cities!: CityEntity[];
}
