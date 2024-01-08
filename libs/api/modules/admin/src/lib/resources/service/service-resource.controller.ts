import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ServiceResourceService } from './service-resource.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@shtifh/auth-service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@ApiTags('Service')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('services')
export class ServiceResourceController {
  private logger = new Logger(ServiceResourceController.name);

  constructor(
    private readonly serviceResourceServices: ServiceResourceService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create New Service' })
  async create(@Body() body: CreateServiceDto) {
    return await this.serviceResourceServices.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List All Services' })
  async list() {
    return await this.serviceResourceServices.list();
  }

  @Post(':id')
  @ApiOperation({ summary: 'Update Service' })
  async update(
    @Body() body: UpdateServiceDto,
    @Param('id', ParseIntPipe) serviceId: number
  ) {
    return await this.serviceResourceServices.update(serviceId, body);
  }
}
