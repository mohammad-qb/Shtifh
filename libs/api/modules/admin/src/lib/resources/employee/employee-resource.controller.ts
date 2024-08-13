import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { BlockEmpDto, CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResourceService } from './employee-resource.service';

@ApiTags('Employee')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@Controller('employees')
export class EmployeeResourceController {
  private logger = new Logger(EmployeeResourceController.name);

  constructor(
    private readonly employeeResourceService: EmployeeResourceService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create New Employee' })
  async create(@Body() body: CreateEmployeeDto) {
    return await this.employeeResourceService.create(body);
  }

  @Post('switch-block')
  @ApiOperation({ summary: 'Create New Employee' })
  async block(@Body() body: BlockEmpDto) {
    return await this.employeeResourceService.switchBlock(body.empId);
  }

  @Get()
  @ApiOperation({ summary: 'List All Employees' })
  async list() {
    return await this.employeeResourceService.list();
  }

  @Get('orders/:employeeId')
  @ApiOperation({ summary: 'List All Employee orders' })
  async orders(@Param('employeeId') employeeId: string) {
    return await this.employeeResourceService.orders(employeeId);
  }

  @Get('private-orders/:employeeId')
  @ApiOperation({ summary: 'List All Employee private orders' })
  async privateOrders(@Param('employeeId') employeeId: string) {
    return await this.employeeResourceService.privateOrders(employeeId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Employee' })
  async update(
    @Body() body: UpdateEmployeeDto,
    @Param('id') employeeId: string
  ) {
    return await this.employeeResourceService.update(employeeId, body);
  }
}
