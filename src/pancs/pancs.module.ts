import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PancsService } from './pancs.service';
import { PancsController } from './pancs.controller';
import { Panc, PancSchema } from './schemas/pancs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Panc.name, schema: PancSchema }]),
  ],
  controllers: [PancsController],
  providers: [PancsService],
})
export class PancsModule {}
