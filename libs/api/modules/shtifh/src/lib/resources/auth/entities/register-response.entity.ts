import { ApiProperty, ApiResponse } from '@nestjs/swagger';

@ApiResponse({})
export class RegisterEntity {
  @ApiProperty()
  success!: boolean;
}
