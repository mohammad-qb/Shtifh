import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
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

  @Get('orders/:customerId')
  @ApiOperation({ summary: 'List All Customer Orders' })
  async orders(@Param('customerId') customerId: string) {
    return await this.customerResourceService.orders(customerId);
  }

  @Get('private-orders/:customerId')
  @ApiOperation({ summary: 'List All Customer Private Orders' })
  async privateOrders(@Param('customerId') customerId: string) {
    return await this.customerResourceService.privateOrders(customerId);
  }

  @Post()
  @ApiOperation({ summary: 'Block Customer' })
  async switchBlock(@Body() body: SwitchBlockCustomerDto) {
    return await this.customerResourceService.switchBlock(body.userId);
  }
}
