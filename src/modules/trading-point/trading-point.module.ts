import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TradingPoint } from 'database-entity-service-lib';
import { TradingPointService } from './trading-point.service.ts';
import { TradingPointController } from './trading-point.controller.ts';

@Module({
  imports: [TypeOrmModule.forFeature([TradingPoint])],
  providers: [TradingPointService],
  controllers: [TradingPointController],
  exports: [TradingPointService],
})
export class TradingPointModule {}

