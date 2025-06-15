import { Module } from '@nestjs/common';
import { ProviderProductController } from './provider-product.controller.ts';
import { ProviderProductService } from './provider-product.service.ts';
import { ProvideProductListService } from 'database-entity-service-lib';
import { DataSource } from 'typeorm';

@Module({
    imports: [],
    providers: [
        ProviderProductService,
        ProvideProductListService,
        {
            provide: DataSource,
            useExisting: DataSource, // <-- получаем из AppModule
        },
    ],
    exports: [DataSource],
})
export class ProviderProductModule {}