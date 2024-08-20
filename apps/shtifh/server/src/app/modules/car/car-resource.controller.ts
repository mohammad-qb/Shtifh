import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { HeaderLang, Lang } from '@shtifh/decorators';
import { Payload } from '@shtifh/user-service';
import { CarResourceService } from './car-resource.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

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

  @Put()
  @ApiOperation({ summary: 'Update Car' })
  async update(@Body() body: UpdateCarDto, @GetUser() user: Payload) {
    return await this.carResourceService.update(user.id, body);
  }

  @Get()
  @ApiOperation({ summary: 'List All Cars' })
  // @ApiResponse({ type: ListCarEntity })
  async list(@GetUser() user: Payload, @Lang() lang: HeaderLang) {
    return await this.carResourceService.list(user.id, lang);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete a car' })
  async delete(@GetUser() user: Payload, @Param('id') id: string) {
    return await this.carResourceService.delete(user.id, id);
  }
}
