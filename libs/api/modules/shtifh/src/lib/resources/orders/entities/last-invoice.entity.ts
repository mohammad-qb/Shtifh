import { ApiProperty } from '@nestjs/swagger';

class CityData {
  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_he!: string;

  @ApiProperty()
  name_en!: string;
}

class ServiceData {
  @ApiProperty()
  name_ar!: string;

  @ApiProperty()
  name_he!: string;

  @ApiProperty()
  name_en!: string;
}

export class RetrieveLastInvoiceEntity {
  @ApiProperty()
  ref_number!: string;

  @ApiProperty()
  date!: string;

  @ApiProperty()
  time!: string;

  @ApiProperty()
  address!: string;

  @ApiProperty({ type: CityData })
  city!: CityData;

  @ApiProperty({ type: ServiceData })
  service!: ServiceData;

  @ApiProperty()
  fees!: number;
}
