import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProviderProductModule } from './modules/provider-product/provider-product.module.ts';
import { TradingPointModule } from './modules/trading-point/trading-point.module.ts';

@Module({})
export class AppModule {
    static forRoot(dbConfig: TypeOrmModuleOptions): DynamicModule {
        return {
            module: AppModule,
            imports: [
                TypeOrmModule.forRoot(dbConfig),
                TradingPointModule,
                ProviderProductModule,
            ],
        };
    }
}
