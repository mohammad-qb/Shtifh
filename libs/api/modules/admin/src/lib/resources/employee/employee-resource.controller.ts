import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { EmployeeResourceService } from './employee-resource.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@ApiTags('Employee')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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

  @Get()
  @ApiOperation({ summary: 'List All Employees' })
  async list() {
    return await this.employeeResourceService.list();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Employee' })
  async update(
    @Body() body: UpdateEmployeeDto,
    @Param('id', ParseIntPipe) employeeId: number
  ) {
    return await this.employeeResourceService.update(employeeId, body);
  }
}
