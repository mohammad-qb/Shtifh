import { Module } from '@nestjs/common';
import { JwtModule } from '@shtifh/jwt-service';
import { TokenResourceService } from './token-resource.service';

@Module({
  imports: [JwtModule],
  providers: [TokenResourceService],
  exports: [TokenResourceService],
})
export class TokenResourceModule {}
