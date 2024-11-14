import { Injectable } from '@nestjs/common';
import { CreateCarOrderService } from './services/create/create-car-order.service';
import { GetCarOrderService } from './services/get/get-car-order.service';
import { ListCarOrdersService } from './services/list/list-car-orders.service';
import {
  CreateNormalCarOrderInput,
  CreatePrivateCarOrderInput,
} from './dtos/create-car-order.dto';
import { UserPayload } from '@shtifh/user-service';
import { HeaderLanguage } from '@shtifh/decorators';
import { UpdateCarOrderService } from './services/update/update-car-order.service';
import { UpdateNormalCarOrderInput } from './dtos/update-car-order.dto';

@Injectable()
export class CarOrderResourceService {
  constructor(
    private readonly createCarOrderService: CreateCarOrderService,
    private readonly getCarOrderService: GetCarOrderService,
    private readonly listCarOrdersService: ListCarOrdersService,
    private readonly updateCarOrderService: UpdateCarOrderService
  ) {}

  async createNormalOrder(
    user: UserPayload,
    lang: HeaderLanguage,
    input: CreateNormalCarOrderInput
  ) {
    return await this.createCarOrderService.createNormalOrder(
      user.id,
      user.userId,
      lang,
      input
    );
  }

  async createPrivateOrder(
    customerId: string,
    lang: HeaderLanguage,
    input: CreatePrivateCarOrderInput
  ) {
    return await this.createCarOrderService.createPrivateOrder(
      customerId,
      lang,
      input
    );
  }

  async updateNormalOrder(
    customerId: string,
    lang: HeaderLanguage,
    input: UpdateNormalCarOrderInput
  ) {
    return await this.updateCarOrderService.updateNormalCarOrder(
      customerId,
      input,
      lang
    );
  }

  async list(customerId: string) {
    return await this.listCarOrdersService.listCarOrders(customerId);
  }

  async getCarOrderById(
    customerId: string,
    carOrderId: string,
    lang: HeaderLanguage
  ) {
    return await this.getCarOrderService.getCarOrderById(
      customerId,
      carOrderId,
      lang
    );
  }
}
