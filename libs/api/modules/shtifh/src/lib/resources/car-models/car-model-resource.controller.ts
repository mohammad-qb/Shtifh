import { Controller, Get, Logger } from '@nestjs/common';
import { CarModelResourceService } from './car-model-resource.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HeaderLang, Lang } from '@shtifh/decorators';
import { ListCarModelsEntity } from './entities/list-car-models.entity';

@ApiTags('Car Model')
@Controller('car-models')
export class CarModelResourceController {
  private logger = new Logger(CarModelResourceController.name);

  constructor(private readonly carModelService: CarModelResourceService) {}

  @Get()
  @ApiOperation({ summary: 'List Car Models' })
  @ApiResponse({ type: ListCarModelsEntity })
  async list(@Lang() lang: HeaderLang) {
    return this.carModelService.list(lang);
  }
}
