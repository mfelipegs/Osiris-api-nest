import { Module } from '@nestjs/common';
import { PancsService } from './pancs.service';
import { PancsController } from './pancs.controller';

@Module({
  controllers: [PancsController],
  providers: [PancsService],
})
export class PancsModule {}
