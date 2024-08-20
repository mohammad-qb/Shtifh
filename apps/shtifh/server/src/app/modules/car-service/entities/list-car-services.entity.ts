import { ApiProperty } from '@nestjs/swagger';

class ListCarServiceServiceData {
  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_he!: string;

  @ApiProperty()
  name_en!: string;

  @ApiProperty()
  id!: string;
}

class ListCarServiceData {
  @ApiProperty({ type: ListCarServiceServiceData })
  service!: ListCarServiceServiceData;

  @ApiProperty()
  fees!: number;
}
export class ListCarServicesEntity {
  @ApiProperty({ type: ListCarServiceData, isArray: true })
  result!: ListCarServiceData;
}
