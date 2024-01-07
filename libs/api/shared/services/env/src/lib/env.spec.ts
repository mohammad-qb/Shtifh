import { Test } from '@nestjs/testing';
import { EnvService } from './env.service';

describe('EnvService', () => {
  let service: EnvService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [EnvService],
    }).compile();

    service = module.get(EnvService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
