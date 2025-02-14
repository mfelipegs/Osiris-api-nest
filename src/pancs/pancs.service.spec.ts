import { Test, TestingModule } from '@nestjs/testing';
import { PancsService } from './pancs.service';

describe('PancsService', () => {
  let service: PancsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PancsService],
    }).compile();

    service = module.get<PancsService>(PancsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
