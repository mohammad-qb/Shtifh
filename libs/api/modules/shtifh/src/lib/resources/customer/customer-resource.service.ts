import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserService } from '@shtifh/user-service';

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

  async update(userId: number, args: UpdateCustomerDto) {
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

  async updatePassword(userId: number, args: UpdatePasswordDto) {
    const user = await this._userModel.findFirst({ where: { id: userId } });

    if (!user) throw new BadRequestException('old_password_wrong');

    const newPassword = await this.userHelper.crypt.cryptPassword(
      args.new_password
    );

    await this._userModel.update({
      where: { id: userId },
      data: { password: newPassword },
    });

    return { success: true };
  }
}
