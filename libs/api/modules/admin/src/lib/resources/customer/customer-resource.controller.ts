import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomerResourceService } from './customer-resource.service';
import { SwitchBlockCustomerDto } from './dto/block-user.dto';

@ApiTags('Customer')
@Controller('customers')
export class CustomerResourceController {
  private logger = new Logger(CustomerResourceController.name);

  constructor(
    private readonly customerResourceService: CustomerResourceService
  ) {}

  @Get()
  @ApiOperation({ summary: 'List All Customers' })
  async list() {
    return await this.customerResourceService.list();
  }

  @Post()
  @ApiOperation({ summary: 'Block Customer' })
  async switchBlock(@Body() body: SwitchBlockCustomerDto) {
    return await this.customerResourceService.switchBlock(body.userId);
  }
}
