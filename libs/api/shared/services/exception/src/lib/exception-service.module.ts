import { Global, Module } from '@nestjs/common';
import { HttpErrorsService } from './http-errors/http-errors.service';

@Global()
@Module({
  imports: [],
  providers: [HttpErrorsService],
  exports: [HttpErrorsService],
})
export class ExceptionModule {}