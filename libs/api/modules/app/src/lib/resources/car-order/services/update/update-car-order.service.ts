import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "@shtifh/prisma-service";
import { UpdateNormalCarOrderInput } from "../../dtos/update-car-order.dto";
import { HeaderLanguage } from "@shtifh/decorators";
import { HttpErrorsService } from "@shtifh/exception-service";

@Injectable()
export class UpdateCarOrderService {
  private logger = new Logger(UpdateCarOrderService.name);

  constructor(private readonly prismaService: PrismaService, private readonly httpErrorsService: HttpErrorsService) {}

  async updateCarOrder(customerId: string, data: UpdateNormalCarOrderInput, lang: HeaderLanguage) {
    this.logger.log(`Update car order with id ${data.carOrderId} for customer ${customerId}`);
    const carOrder = await this.prismaService.carOrder.findFirst({where: {id: data.carOrderId}});

    if(!carOrder) {
      throw this.httpErrorsService.orderNotFound(data.carOrderId, lang);
    }

    if(carOrder.customerId !== customerId) {
      throw this.httpErrorsService.orderNotBelongToCustomer(data.carOrderId, lang);
    }


    if(carOrder.type !== 'NORMAL') {
      throw this.httpErrorsService.orderNotNormalType(data.carOrderId, lang);
    }

    const city = await this.prismaService.city.findFirst({where: {id: data.cityId}});

    if(!city) {
      throw this.httpErrorsService.cityNotFound(data.cityId, lang);
    }

    const car = await this.prismaService.car.findFirst({where: {id: data.carId, customerId}});

    if(!car) {
      throw this.httpErrorsService.carNotFound(data.carId, lang);
    }

    const carModelService = city.car_model_services.find(el => el.serviceId === data.serviceId);

    if(!carModelService) {
      throw this.httpErrorsService.serviceNotAvailableForCity(data.serviceId, data.cityId, lang);
    }

    if(carModelService.carModelId !== car.carModelId) {
      throw this.httpErrorsService.serviceNotAvailableForCarModel(data.serviceId, car.carModelId, lang);
    }

    //TODO: save in cache the data to set them after payment with order id as key
    //TODO: generate payment link
    //TODO: return it

    // await this.prismaService.carOrder.update({where: {id: data.id}, data});
    this.logger.log(`Car order ${data.carOrderId} updated for customer ${customerId}`);
    return true
  }
}
