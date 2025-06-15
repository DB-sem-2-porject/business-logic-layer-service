import { ApiProperty } from '@nestjs/swagger';

export class AddProductDto {
    @ApiProperty({ description: 'ID поставщика' })
    providerId!: number;

    @ApiProperty({ description: 'ID продукта' })
    productId!: number;

    @ApiProperty({ description: 'Цена продукта' })
    price!: number;
}