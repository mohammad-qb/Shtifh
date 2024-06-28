import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from '@shtifh/user-service';

function compareDates(
  date1?: string | null,
  date2?: string | null
): string | null | undefined {
  if (date1 == null && date2 == null) {
    // Check for both null and undefined
    return null;
  } else if (date1 == null) {
    return date2; // Return date2 if date1 is null or undefined
  } else if (date2 == null) {
    return date1; // Return date1 if date2 is null or undefined
  }

  const dateTime1 = new Date(date1);
  const dateTime2 = new Date(date2);

  if (dateTime1 > dateTime2) {
    return date1;
  } else {
    return date2;
  }
}

@Injectable()
export class CustomerResourceService {
  private logger = new Logger(CustomerResourceService.name);
  private model;
  private _userModel;
  private userHelper;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService
  ) {
    this.model = prismaService.customer;
    this._userModel = prismaService.user;
    this.userHelper = userService.resources;
  }

  async updateProfileImage() {}

  async update(userId: string, args: UpdateCustomerDto) {
    const user = await this._userModel.update({
      where: { id: userId },
      data: args,
      select: {
        email: true,
        full_name: true,
        id: true,
        role: true,
        mobile: true,
      },
    });

    if (!user) throw new BadRequestException('user_not_exist');

    return { user: { ...user, ...args } };
  }

  async updatePassword(userId: string, args: UpdatePasswordDto) {
    console.log({ userId, args });
    const user = await this._userModel.findFirst({ where: { id: userId } });

    if (!user) throw new BadRequestException('old_password_wrong');
    const isPasswordMatch = await this.userHelper.crypt.isPasswordMatch(
      args.old_password,
      user.password
    );

    if (!isPasswordMatch) throw new BadRequestException('old_password_wrong');

    const newPassword = await this.userHelper.crypt.cryptPassword(
      args.new_password
    );

    await this._userModel.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    return { success: true };
  }

  async statistics(customerId: string) {
    const [
      carCount,
      ordersCount,
      lastOrderDate,
      privateOrdersCount,
      lastPrivateOrderDate,
    ] = await Promise.all([
      await this.prismaService.car.count({ where: { customerId } }),
      await this.prismaService.order.count({
        where: { is_done: true, customerId },
      }),
      await this.prismaService.order.findFirst({
        where: { is_done: true, customerId },
        orderBy: { date: 'desc' },
      }),
      await this.prismaService.privateOrder.count({ where: { customerId } }),
      await this.prismaService.privateOrder.findFirst({
        where: { is_done: true, customerId },
        orderBy: { date: 'desc' },
      }),
    ]);

    const result = compareDates(
      lastOrderDate?.date,
      lastPrivateOrderDate?.date
    );

    return {
      carsCount: carCount,
      ordersCount: ordersCount + privateOrdersCount,
      lastOrderDate: result || '',
    };
  }
}
