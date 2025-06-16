import { Module } from '@nestjs/common';
import { TradingPointService } from './trading-point.service.ts';
import { TradingPointController } from './trading-point.controller.ts';

@Module({
  providers: [TradingPointService],
  controllers: [TradingPointController],
  exports: [TradingPointService],
})
export class TradingPointModule {}

