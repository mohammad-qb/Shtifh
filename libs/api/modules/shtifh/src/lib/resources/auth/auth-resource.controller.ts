import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthResourceService } from './auth-resource.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterEntity } from './entities/register-response.entity';
import { LoginEntity } from './entities/login-response.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthResourceController {
  private logger = new Logger(AuthResourceController.name);

  constructor(private readonly authResourceService: AuthResourceService) {}

  @Post('register')
  @ApiOperation({ summary: 'register user' })
  @ApiResponse({type: RegisterEntity})
  async register(@Body() body: RegisterDto) {
    return await this.authResourceService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({type: LoginEntity})
  async login(@Body() body: LoginDto) {
    return await this.authResourceService.login(body);
  }
}
