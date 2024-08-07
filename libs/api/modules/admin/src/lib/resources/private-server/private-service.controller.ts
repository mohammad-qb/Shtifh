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
import { PrivateServiceService } from './private-service.service';
import {
  ActivatePrivateServiceDto,
  CreatePrivateServiceDto,
} from './private-service.dto';

@ApiTags('Private Service')
@Controller('private-services')
export class PrivateServiceController {
  private logger = new Logger(PrivateServiceController.name);

  constructor(private readonly privateServiceService: PrivateServiceService) {}

  @Post()
  @ApiOperation({ summary: 'Create Private Service' })
  async create(@Body() body: CreatePrivateServiceDto) {
    return await this.privateServiceService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update Private Service' })
  async update(@Body() body: CreatePrivateServiceDto, @Param('id') id: string) {
    return await this.privateServiceService.update(id, body);
  }

  @Get()
  @ApiOperation({ summary: 'List Private Services' })
  async list() {
    return await this.privateServiceService.list();
  }

  @Put('activation')
  @ApiOperation({ summary: 'Update Activation Private Order' })
  async activate(@Body() body: ActivatePrivateServiceDto) {
    return await this.privateServiceService.activation(body.id);
  }
}
