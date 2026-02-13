import { Module } from '@nestjs/common';
import { DessertsController } from './desserts.controller';
import { DessertsService } from './desserts.service';

@Module({
  controllers: [DessertsController],
  providers: [DessertsService],
  exports: [DessertsService],
})
export class DessertsModule {}
