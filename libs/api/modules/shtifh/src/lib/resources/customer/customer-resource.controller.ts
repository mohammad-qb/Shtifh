import { Body, Controller, Logger, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { CustomerResourceService } from './customer-resource.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Payload } from '@shtifh/user-service';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Customer')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('customers')
export class CustomerResourceController {
  private logger = new Logger(CustomerResourceController.name);

  constructor(
    private readonly customerResourceService: CustomerResourceService
  ) {}

  @Put('profile-image')
  @ApiOperation({ summary: 'Update Customer Image Profile' })
  async updateImageProfile() {
    return await this.customerResourceService.updateProfileImage();
  }

  @Put()
  @ApiOperation({ summary: 'Update Customer Profile' })
  async update(@Body() body: UpdateCustomerDto, @GetUser() user: Payload) {
    return await this.customerResourceService.update(user.userId, body);
  }

  @Put('password')
  @ApiOperation({ summary: 'Update Customer Password' })
  async updatePassword(
    @Body() body: UpdatePasswordDto,
    @GetUser() user: Payload
  ) {
    return await this.customerResourceService.updatePassword(user.id, body);
  }
}
