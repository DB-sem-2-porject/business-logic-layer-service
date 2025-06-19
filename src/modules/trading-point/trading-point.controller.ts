import {Controller, Get, Post, Put, Delete, Param, Body, BadRequestException, NotFoundException} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TradingPointService } from './trading-point.service.ts';
import { CreateTradingPointDto } from './dto/create-trading-point.dto.ts';
import { UpdateTradingPointDto } from './dto/update-trading-point.dto.ts';

@ApiTags('TradingPoint')
@Controller('trading-point')
export class TradingPointController {
  constructor(private readonly tradingPointService: TradingPointService) {}

  @Get()
  @ApiOperation({ summary: 'Get all trading points' })
  @ApiResponse({ status: 200, type: [CreateTradingPointDto] })
  findAll() {
    return this.tradingPointService.readAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trading point by id' })
  @ApiResponse({ status: 200, type: CreateTradingPointDto })
  @ApiResponse({ status: 404, description: 'Trading point not found' })
  async findOne(@Param('id') id: number) {
    const tradingPoint = await this.tradingPointService.readOne(Number(id));
    if (!tradingPoint) {
      throw new NotFoundException('Trading point with this ID does not exist');
    }
    return tradingPoint;
  }

  @Post()
  @ApiOperation({ summary: 'Create trading point' })
  @ApiResponse({ status: 201, type: CreateTradingPointDto })
  create(@Body() data: CreateTradingPointDto) {
    return this.tradingPointService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update trading point' })
  @ApiResponse({ status: 200, type: UpdateTradingPointDto })
  update(@Param('id') id: number, @Body() data: UpdateTradingPointDto) {
    return this.tradingPointService.update(Number(id), data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete trading point' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: number) {
    return this.tradingPointService.remove(Number(id));
  }
}

