import { Test } from '@nestjs/testing';
import { DateAccessService } from './date-access.service';

describe('DateAccessService', () => {
  let service: DateAccessService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [DateAccessService],
    }).compile();

    service = module.get(DateAccessService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
