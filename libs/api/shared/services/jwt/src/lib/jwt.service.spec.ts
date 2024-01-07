import { Test } from '@nestjs/testing';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [JwtService],
    }).compile();

    service = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
