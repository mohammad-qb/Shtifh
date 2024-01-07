import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserModule } from '@shtifh/user-service';

@Module({
  imports: [UserModule],
  providers: [JwtAuthGuard],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
