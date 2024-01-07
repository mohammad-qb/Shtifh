import { ApiProperty, ApiResponse } from '@nestjs/swagger';

@ApiResponse({})
export class RegisterResponseModel {
  @ApiProperty()
  success!: boolean;
}
