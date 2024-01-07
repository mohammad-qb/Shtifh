import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthShtifhService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthShtifhController {
  private logger = new Logger(AuthShtifhController.name);

  constructor(private readonly authShtifhService: AuthShtifhService) {}

  @Post('register')
  @ApiOperation({ summary: 'register user' })
  async register(@Body() body: RegisterDto) {
    return await this.authShtifhService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() body: LoginDto) {
    return await this.authShtifhService.login(body);
  }
}
