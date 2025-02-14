import { Test, TestingModule } from '@nestjs/testing';
import { PancsController } from './pancs.controller';
import { PancsService } from './pancs.service';

describe('PancsController', () => {
  let controller: PancsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PancsController],
      providers: [PancsService],
    }).compile();

    controller = module.get<PancsController>(PancsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
