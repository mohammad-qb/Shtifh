import { Controller, Get, Logger, UseGuards } from '@nestjs/common';
import { UserResourceService } from './user-resource.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser, JwtAuthGuard } from '@shtifh/auth-service';
import { Payload } from '@shtifh/user-service';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserResourceController {
  private logger = new Logger(UserResourceController.name);

  constructor(private readonly userResourceService: UserResourceService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the user detail by token' })
  async me(@GetUser() user: Payload) {
    return await this.userResourceService.me(user.id);
  }
}
