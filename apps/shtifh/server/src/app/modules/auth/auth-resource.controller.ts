import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthResourceService } from './auth-resource.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterEntity } from './entities/register-response.entity';
import { LoginEntity } from './entities/login-response.entity';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ValidateCodeDto } from './dto/validate-code.dto';
import { ForgetPasswordEntity } from './entities/forget-password.entity';
import { ResetPasswordEntity } from './entities/reset-passsord.entity';
import { ValidateCodeEntity } from './entities/validate-code.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthResourceController {
  private logger = new Logger(AuthResourceController.name);

  constructor(private readonly authResourceService: AuthResourceService) {}

  @Post('register')
  @ApiOperation({ summary: 'register user' })
  @ApiResponse({ type: RegisterEntity })
  async register(@Body() body: RegisterDto) {
    return await this.authResourceService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ type: LoginEntity })
  async login(@Body() body: LoginDto) {
    return await this.authResourceService.login(body);
  }

  @Post('forget-password')
  @ApiOperation({ summary: 'Forget password' })
  @ApiResponse({ type: ForgetPasswordEntity })
  async forgetPassword(@Body() body: ForgetPasswordDto) {
    return await this.authResourceService.forgetPassword(body);
  }

  @Post('rest-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({ type: ResetPasswordEntity })
  async resetPassword(@Body() body: ResetPasswordDto) {
    return await this.authResourceService.resetPassword(body);
  }

  @Post('validate-code')
  @ApiOperation({ summary: 'Validate Reset Password Code' })
  @ApiResponse({ type: ValidateCodeEntity })
  async validateCode(@Body() body: ValidateCodeDto) {
    return await this.authResourceService.validateCode(body);
  }
}
