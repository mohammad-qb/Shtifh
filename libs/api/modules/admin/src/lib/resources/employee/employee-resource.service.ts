import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@shtifh/prisma-service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeResourceService {
  private logger = new Logger(EmployeeResourceService.name);
  private model;

  constructor(private readonly prismaService: PrismaService) {
    this.model = prismaService.employee;
  }

  async create(args: CreateEmployeeDto) {
    const employee = await this.model.create({
      data: {
        color: args.color,
        position: args.position,
        salary: args.salary,
        start_date: args.start_date,
        work_days: args.work_days,
        user: {
          create: {
            email: args.email,
            full_name: args.full_name,
            mobile: args.full_name,
            password: '',
            role: 'EMPLOYEE',
          },
        },
      },
    });
    return { result: employee };
  }

  async list() {
    const employees = await this.model.findMany();
    return { result: employees };
  }

  async update(employeeId: number, args: UpdateEmployeeDto) {
    const employee = await this.model.update({
      where: { id: employeeId },
      data: {
        color: args.color,
        position: args.position,
        salary: args.salary,
        start_date: args.start_date,
        work_days: args.work_days,
        user: {
          update: {
            email: args.email,
            full_name: args.full_name,
            mobile: args.full_name,
          },
        },
      },
    });

    return { result: employee };
  }
}
