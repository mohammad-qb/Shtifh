import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccessoriesResourceService } from './accessories.service';
import { CreateAccessoriesDto } from './dto/create.dto';
import { UpdateAccessoriesDto } from './dto/update.dto';

@ApiTags('Accessories')
@Controller('accessories')
export class AccessoriesResourceController {
  private logger = new Logger(AccessoriesResourceController.name);

  constructor(private readonly service: AccessoriesResourceService) {}

  @Post()
  @ApiOperation({ summary: 'Create Accessory' })
  async create(@Body() body: CreateAccessoriesDto) {
    return await this.service.create(body);
  }

  @Get()
  @ApiOperation({ summary: 'List All Accessories' })
  async list() {
    return await this.service.list();
  }

  @Put('/activate/:id')
  @ApiOperation({ summary: 'Switch Activation Accessory' })
  async activate(@Param('id') id: string) {
    return await this.service.active(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Accessory' })
  async update(@Body() body: UpdateAccessoriesDto, @Param('id') id: string) {
    return await this.service.update(id, body);
  }
}
