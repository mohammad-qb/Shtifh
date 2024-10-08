import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthResourceService } from './auth-resource.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { CreateAdminDto } from './dto/create.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthResourceController {
  private logger = new Logger(AuthResourceController.name);

  constructor(private readonly authResourceService: AuthResourceService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login To Admin' })
  async login(@Body() body: LoginDto) {
    return await this.authResourceService.login(body);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create Admin' })
  async create(@Body() body: CreateAdminDto) {
    return await this.authResourceService.create(body);
  }
}
