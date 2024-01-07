import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthResourceService } from './auth-resource.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthResourceController {
  private logger = new Logger(AuthResourceController.name);

  constructor(private readonly authResourceService: AuthResourceService) {}

  @Post('register')
  @ApiOperation({ summary: 'register user' })
  async register(@Body() body: RegisterDto) {
    return await this.authResourceService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() body: LoginDto) {
    return await this.authResourceService.login(body);
  }
}
