import { Module } from '@nestjs/common';
import { CryptResourceService } from './crypt-resource.service';

@Module({
  imports: [],
  providers: [CryptResourceService],
  exports: [CryptResourceService],
})
export class CryptResourceModule {}
