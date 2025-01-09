import { PrismaService } from '@shtifh/prisma-service';
import { HttpErrorsService } from '@shtifh/exception-service';
import { HeaderLanguage } from '@shtifh/decorators';
import { CarServiceType } from '@shtifh/helpers';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCarOrderValidator {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpErrors: HttpErrorsService
  ) {}

  async validateService(
    serviceId: string,
    lang: HeaderLanguage,
    type?: CarServiceType
  ) {
    const service = await this.prismaService.service.findFirst({
      where: { id: serviceId },
    });
    if (!service) throw this.httpErrors.serviceNotFound(serviceId, lang);

    if (type && service.type !== type) {
      throw this.httpErrors.serviceNotPublic(serviceId, lang);
    }

    return service;
  }

  async validateCity(cityId: string, lang: HeaderLanguage) {
    const city = await this.prismaService.city.findFirst({
      where: { id: cityId },
    });
    if (!city) throw this.httpErrors.cityNotFound(cityId, lang);

    return city;
  }

  async validateUser(userId: string, lang: HeaderLanguage) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw this.httpErrors.userNotFound(userId, lang);

    return user;
  }
}
