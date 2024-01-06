import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthShtifhService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthShtifhController {
  private logger = new Logger(AuthShtifhController.name);

  constructor(private readonly authShtifhService: AuthShtifhService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return await this.authShtifhService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return await this.authShtifhService.login(body);
  }
}
