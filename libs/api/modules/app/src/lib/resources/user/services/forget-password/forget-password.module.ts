import { Module } from "@nestjs/common";
import {
  ForgetPasswordService
} from './forget-password.service';

@Module({
  providers: [ForgetPasswordService],
  exports: [ForgetPasswordService],
})
export class ForgetPasswordModule {}
