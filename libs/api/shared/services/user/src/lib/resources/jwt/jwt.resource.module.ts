import { Module } from '@nestjs/common';
import { JwtModule } from '@shtifh/jwt-service';
import { JwtResourceService } from './jwt-resource.service';

@Module({
  imports: [JwtModule],
  providers: [JwtResourceService],
  exports: [JwtResourceService],
})
export class JwtResourceModule {}
