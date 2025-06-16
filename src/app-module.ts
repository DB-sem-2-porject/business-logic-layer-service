import { Module } from '@nestjs/common';
import { TradingPointModule } from './modules/trading-point/trading-point.module.ts';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TradingPointModule,
        // ProviderProductModule,
        HttpModule,
    ],
})
export class AppModule {}
