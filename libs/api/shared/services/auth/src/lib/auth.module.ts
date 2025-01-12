import { Module } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { JwtModule } from '@shtifh/jwt-service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [JwtAuthGuard, AuthService],
  exports: [JwtAuthGuard, AuthService],
})
export class AuthModule {}
