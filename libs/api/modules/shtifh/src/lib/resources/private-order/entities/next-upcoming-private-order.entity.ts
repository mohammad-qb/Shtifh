import { ApiProperty } from '@nestjs/swagger';
import {
  $Enums,
  Car,
  CarBrand,
  CarModel,
  City,
  Customer,
  privateOrder,
  PrivateService,
} from '@prisma/client';

class PrivateOrderCityData implements City {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  active!: boolean | null;
  @ApiProperty()
  name_ar!: string;
  @ApiProperty()
  name_en!: string;
  @ApiProperty()
  name_he!: string;
}

class PrivateOrderCarModelData implements CarModel {
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

class PrivateOrderCarBrandData implements CarBrand {
  @ApiProperty()
  id!: string;
  @ApiProperty({ nullable: true })
  image_url!: string | null;
  @ApiProperty()
  name_en!: string;
  @ApiProperty()
  name_he!: string;
  @ApiProperty()
  name_ar!: string;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}

class PrivateOrderCarData implements Car {
  @ApiProperty()
  id!: string;
  @ApiProperty({ nullable: true })
  plate!: string | null;
  @ApiProperty()
  year!: number;
  @ApiProperty({ enum: $Enums.CarColor })
  color!: $Enums.CarColor;
  @ApiProperty()
  is_active!: boolean;
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
  @ApiProperty()
  customerId!: string;
  @ApiProperty()
  carModelId!: string;
  @ApiProperty()
  cityId!: string;
  @ApiProperty()
  carBrandId!: string;
  @ApiProperty({ type: PrivateOrderCarBrandData })
  brand!: PrivateOrderCarBrandData;
  @ApiProperty({ type: PrivateOrderCarModelData })
  model!: PrivateOrderCarModelData;
}

class PrivateOrderCustomerData implements Customer {
  @ApiProperty()
  id!: string;
  @ApiProperty({ nullable: true })
  image_url!: string | null;
  @ApiProperty({ nullable: true, enum: $Enums.Gender })
  gender!: $Enums.Gender | null;
  @ApiProperty()
  is_removed!: boolean;
  @ApiProperty()
  userId!: string;
  @ApiProperty()
  cityId!: string;
}

class PrivateOrderServiceEntity implements PrivateService {
  @ApiProperty()
  description_ar!: string;
  @ApiProperty()
  description_en!: string;
  @ApiProperty()
  description_he!: string;
  @ApiProperty()
  is_active!: boolean;
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
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
}

export class NextUpcomingPrivateOrderEntity implements privateOrder {
  @ApiProperty()
  id!: string;
  @ApiProperty()
  is_done!: boolean;
  @ApiProperty({ enum: $Enums.OrderStatus })
  status!: $Enums.OrderStatus;
  @ApiProperty()
  address!: string | null;
  @ApiProperty()
  date!: Date | null;
  @ApiProperty()
  time!: string | null;
  @ApiProperty()
  lat_lng!: string[];
  @ApiProperty()
  createdAt!: Date;
  @ApiProperty()
  updatedAt!: Date;
  @ApiProperty()
  price!: number;
  @ApiProperty()
  customerId!: string;
  @ApiProperty()
  employeeId!: string | null;
  @ApiProperty()
  privateServiceId!: string;
  @ApiProperty()
  carId!: string;
  @ApiProperty()
  cityId!: string;
  @ApiProperty({ type: PrivateOrderCarData })
  car!: PrivateOrderCarData;
  @ApiProperty({ type: PrivateOrderCustomerData })
  customer!: PrivateOrderCustomerData;
  @ApiProperty({ type: PrivateOrderCityData })
  city!: PrivateOrderCityData;
  @ApiProperty({ type: PrivateOrderServiceEntity })
  private_service!: PrivateOrderServiceEntity;
}
