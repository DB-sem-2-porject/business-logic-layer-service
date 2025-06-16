import { Module } from '@nestjs/common';
import { TradingPointModule } from './modules/trading-point/trading-point.module.ts';
import { HttpModule } from '@nestjs/axios';
import {SqlModule} from "./modules/sql/sql.module.js";

@Module({
    imports: [
        TradingPointModule,
        SqlModule,
        // ProviderProductModule,
        HttpModule,
    ],
})
export class AppModule {}
