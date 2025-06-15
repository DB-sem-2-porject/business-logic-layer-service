import { Injectable } from '@nestjs/common';
import { ProvideProductListService } from 'database-entity-service-lib';
import { AddProductDto } from './dto/add-product.dto.ts';

@Injectable()
export class ProviderProductService {
    constructor(
        private readonly providerProductListService: ProvideProductListService
    ) {}

    async addProduct(data: AddProductDto) {
        // Бизнес-правила
        if (data.price <= 0) {
            throw new Error('Price must be positive');
        }

        const existing = await this.providerProductListService.readOne({
            where: {
                provider: { id: data.providerId },
                product: { id: data.productId }
            }
        });

        if (existing) {
            throw new Error('This product is already added to provider');
        }

        return this.providerProductListService.create({
            provider: { id: data.providerId },
            product: { id: data.productId },
            price: data.price
        });
    }
}