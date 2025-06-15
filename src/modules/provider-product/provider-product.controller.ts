import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProviderProductService } from './provider-product.service.ts';
import { AddProductDto } from './dto/add-product.dto.ts';

@ApiTags('provider-products')
@Controller('provider-products')
export class ProviderProductController {
    constructor(
        private readonly providerProductService: ProviderProductService
    ) {}

    @ApiOperation({ summary: 'Добавить продукт поставщику' })
    @ApiResponse({
        status: 201,
        description: 'Продукт успешно добавлен'
    })
    @Post()
    async addProduct(@Body() data: AddProductDto) {
        return this.providerProductService.addProduct(data);
    }
}