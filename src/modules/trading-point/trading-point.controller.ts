import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TradingPointService } from './trading-point.service.ts';
import { TradingPoint } from 'database-entity-service-lib';

@ApiTags('TradingPoint')
@Controller('trading-point')
export class TradingPointController {
  constructor(private readonly tradingPointService: TradingPointService) {}

  @Get()
  @ApiOperation({ summary: 'Get all trading points' })
  @ApiResponse({ status: 200, type: [TradingPoint] })
  findAll() {
    return this.tradingPointService.readAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trading point by id' })
  @ApiResponse({ status: 200, type: TradingPoint })
  findOne(@Param('id') id: number) {
    return this.tradingPointService.readOne(Number(id));
  }

  @Post()
  @ApiOperation({ summary: 'Create trading point' })
  @ApiResponse({ status: 201, type: TradingPoint })
  create(@Body() data: Partial<TradingPoint>) {
    return this.tradingPointService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update trading point' })
  @ApiResponse({ status: 200, type: TradingPoint })
  update(@Param('id') id: number, @Body() data: Partial<TradingPoint>) {
    return this.tradingPointService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete trading point' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.tradingPointService.remove(Number(id));
  }
}

