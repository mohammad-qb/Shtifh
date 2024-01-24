import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { CarResourceService } from './car-resource.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateCarDto } from './dto/create-car.dto';
import { Payload } from '@shtifh/user-service';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { ListCarEntity } from './entities/list-car-response.entity';
import { Lang, HeaderLang } from '@shtifh/decorators';

@ApiTags('Car')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cars')
export class CarResourceController {
  private logger = new Logger(CarResourceController.name);

  constructor(private readonly carResourceService: CarResourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create New Car' })
  async create(@Body() body: CreateCarDto, @GetUser() user: Payload) {
    return await this.carResourceService.create(user.id, body);
  }

  @Get()
  @ApiOperation({ summary: 'List All Cars' })
  @ApiResponse({ type: ListCarEntity })
  async list(@GetUser() user: Payload, @Lang() lang: HeaderLang) {
    return await this.carResourceService.list(user.id, lang);
  }
}
