import { Body, Controller, Get, Logger, Put, UseGuards } from '@nestjs/common';
import { UserResourceService } from './user-resource.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { Payload } from '@shtifh/user-service';
import { MeEntity } from './entities/me.entity';
import { SwitchLangDto } from './dto/switch-lang.dto';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiBearerAuth()
export class UserResourceController {
  private logger = new Logger(UserResourceController.name);

  constructor(private readonly userResourceService: UserResourceService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get the user detail by token' })
  @ApiResponse({ type: MeEntity })
  async me(@GetUser() user: Payload) {
    return await this.userResourceService.me(user.userId);
  }

  @Put('lang')
  @ApiOperation({ summary: 'Update User language' })
  async lang(@GetUser() user: Payload, @Body() body: SwitchLangDto) {
    return await this.userResourceService.lang(body, user.userId);
  }
}
