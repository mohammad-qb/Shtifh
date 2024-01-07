import { Module } from '@nestjs/common';
import { PrismaModule } from '@shtifh/prisma-service';
import { UserResourceController } from './user-resource.controller';
import { UserResourceService } from './user-resource.service';
import { UserModule } from '@shtifh/user-service';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [UserResourceController],
  providers: [UserResourceController, UserResourceService],
  exports: [UserResourceController, UserResourceService],
})
export class UserResourceModule {}
