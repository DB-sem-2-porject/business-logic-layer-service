import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateTradingPointDto {
  @ApiProperty()
  @IsString()
  name!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  sizeSqm?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  rentCost?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  utilityCost?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  counterCount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  floorsCount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  openingDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  active?: boolean;
}

