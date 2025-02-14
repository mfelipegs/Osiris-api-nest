import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PancsModule } from './pancs/pancs.module';

@Module({
  imports: [PancsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
