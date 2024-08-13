import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { UserService } from '@shtifh/user-service';
import { FCMService } from '@shtifh/fcm-service';

@Injectable()
export class EmployeeResourceService {
  private logger = new Logger(EmployeeResourceService.name);
  private model;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly fcmService: FCMService
  ) {
    this.model = prismaService.employee;
  }

  async create(args: CreateEmployeeDto) {
    const employee = await this.model.create({
      data: {
        color: args.color,
        position: args.position,
        salary: args.salary,
        start_date: args.start_date,
        user: {
          create: {
            email: args.email,
            full_name: args.full_name,
            mobile: args.mobile,
            password: await this.userService.resources.crypt.cryptPassword(
              args.password
            ),
            role: 'EMPLOYEE',
          },
        },
      },
    });
    return { result: employee };
  }

  async list() {
    const employees = await this.model.findMany({ include: { user: true } });
    return { result: employees };
  }

  async switchBlock(userId: string) {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!user) throw new BadRequestException('user_wrong');

    await this.prismaService.user.update({
      where: { id: userId },
      data: { is_blocked: !user.is_blocked },
    });

    if (!user.is_blocked) {
      await this.fcmService.send({
        data: {},
        topic: `block-emp-${userId}`,
        notification: {
          title: 'You got blocked',
          body: "You've been blocked",
        },
      });
    }
  }

  async update(employeeId: string, args: UpdateEmployeeDto) {
    const employee = await this.model.update({
      where: { id: employeeId },
      data: {
        color: args.color,
        position: args.position,
        salary: args.salary,
        start_date: args.start_date,
        user: {
          update: {
            email: args.email,
            full_name: args.full_name,
            mobile: args.mobile,
          },
        },
      },
    });

    return { result: employee };
  }

  async orders(employeeId: string) {
    const data = await this.prismaService.order.findMany({
      where: { employeeId },
      include: {
        customer: { include: { user: true } },
        city: true,
        car: { include: { brand: true, model: true } },
        service: { include: { service: true } },
        accessories: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const groupedData = data.reduce((acc: any, el) => {
      const gDate = new Date(el.date).toDateString();
      if (!acc[gDate]) {
        acc[gDate] = [];
      }
      acc[gDate].push(el);
      return acc;
    }, {});

    const transformedData = Object.keys(groupedData).map((date) => ({
      date,
      orders: groupedData[date],
    }));

    return { results: transformedData };
  }

  async privateOrders(employeeId: string) {
    const data = await this.prismaService.privateOrder.findMany({
      where: { employeeId },
      include: {
        car: { include: { model: true, brand: true } },
        city: true,
        customer: { include: { user: true } },
        private_service: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const groupedData = data.reduce((acc: any, el) => {
      const gDate = new Date(el.createdAt).toDateString();
      if (!acc[gDate]) {
        acc[gDate] = [];
      }
      acc[gDate].push(el);
      return acc;
    }, {});

    const transformedData = Object.keys(groupedData).map((date) => ({
      date,
      orders: groupedData[date],
    }));

    return { results: transformedData };
  }
}
