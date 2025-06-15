import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { TradingPointService as LibTradingPointService } from 'database-entity-service-lib';
import { TradingPoint } from 'database-entity-service-lib';

@Injectable()
export class TradingPointService {
  constructor(private readonly libTradingPointService: LibTradingPointService) {}

  async readAll(): Promise<TradingPoint[]> {
    return this.libTradingPointService.read();
  }

  async readOne(id: number): Promise<TradingPoint | null> {
    return this.libTradingPointService.readOne({ where: { id } });
  }

  private validate(data: Partial<TradingPoint>) {
    if (!data.name || data.name.trim() === '') {
      throw new BadRequestException('Name is required');
    }
    if (data.sizeSqm !== undefined && data.sizeSqm < 0) {
      throw new BadRequestException('Size (sqm) cannot be negative');
    }
    if (data.rentCost !== undefined && data.rentCost < 0) {
      throw new BadRequestException('Rent cost cannot be negative');
    }
    if (data.utilityCost !== undefined && data.utilityCost < 0) {
      throw new BadRequestException('Utility cost cannot be negative');
    }
    if (data.counterCount !== undefined && data.counterCount < 0) {
      throw new BadRequestException('Counter count cannot be negative');
    }
    if (data.floorsCount !== undefined && data.floorsCount < 1) {
      throw new BadRequestException('Floors count must be at least 1');
    }
  }

  async create(data: Partial<TradingPoint>): Promise<TradingPoint> {
    this.validate(data);
    const exists = await this.libTradingPointService.read({ where: { name: data.name } });
    if (exists.length > 0) {
      throw new ConflictException('Trading point with this name already exists');
    }
    return this.libTradingPointService.create(data);
  }

  async update(id: number, data: Partial<TradingPoint>): Promise<TradingPoint | null> {
    this.validate(data);
    if (data.name) {
      const exists = await this.libTradingPointService.read({where: { name: data.name }});
      if (exists.length > 0 && exists[0].id !== id) {
        throw new ConflictException('Trading point with this name already exists');
      }
    }
    await this.libTradingPointService.update({where:{ id }}, data);
    return this.readOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.libTradingPointService.delete({ id });
  }
}

