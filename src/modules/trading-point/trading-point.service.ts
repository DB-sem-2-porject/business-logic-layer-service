import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';

@Injectable()
export class TradingPointService {
  private readonly graphqlEndpoint = process.env.DATABASE_ACCESS_SERVICE_GRAPHQL || 'http://localhost:40002/graphql';

  private async graphqlRequest<T>(query: string, variables?: any): Promise<T> {
    const res = await fetch(this.graphqlEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const json = await res.json();
    if (json.errors) throw new Error(JSON.stringify(json.errors));
    return json.data;
  }

  async readAll(): Promise<any[]> {
    const query = `query { trading_points { id name type address sizeSqm rentCost utilityCost counterCount floorsCount openingDate active } }`;
    const data = await this.graphqlRequest<{ trading_points: any[] }>(query);
    return data.trading_points;
  }

  async readOne(id: number): Promise<any | null> {
    const query = `query($id: Float!) { trading_point(id: $id) { id name type address sizeSqm rentCost utilityCost counterCount floorsCount openingDate active } }`;
    const data = await this.graphqlRequest<{ trading_point: any }>(query, { id });
    const tp = data.trading_point;
    if (!tp) return null;
    let date = tp.openingDate;
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      date = date + 'T00:00:00.000Z';
    } else if (date instanceof Date) {
      date = date.toISOString();
    }
    return { ...tp, openingDate: date };
  }

  private validate(data: Partial<any>) {
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

  async create(data: Partial<any>): Promise<any> {
    this.validate(data);
    const all = await this.readAll();
    if (all.some(tp => tp.name === data.name)) {
      throw new ConflictException('Trading point with this name already exists');
    }
    const mutation = `mutation(
      $name: String!,
      $type: String!,
      $address: String!,
      $sizeSqm: Float!,
      $rentCost: Float!,
      $utilityCost: Float!,
      $counterCount: Float!,
      $floorsCount: Float!,
      $openingDate: DateTime,
      $active: Boolean!
    ) {
      createTradingPoint(
        name: $name,
        type: $type,
        address: $address,
        sizeSqm: $sizeSqm,
        rentCost: $rentCost,
        utilityCost: $utilityCost,
        counterCount: $counterCount,
        floorsCount: $floorsCount,
        openingDate: $openingDate,
        active: $active
      ) {
        id name type address sizeSqm rentCost utilityCost counterCount floorsCount openingDate active
      }
    }`;
    const variables = {
      name: data.name,
      type: data.type,
      address: data.address,
      sizeSqm: data.sizeSqm,
      rentCost: data.rentCost,
      utilityCost: data.utilityCost,
      counterCount: data.counterCount,
      floorsCount: data.floorsCount,
      openingDate: data.openingDate,
      active: data.active,
    };
    const result = await this.graphqlRequest<{ createTradingPoint: any }>(mutation, variables);
    return result.createTradingPoint;
  }

  async update(id: number, data: Partial<any>): Promise<any | null> {
    this.validate(data);
    if (data.name) {
      const all = await this.readAll();
      if (all.some(tp => tp.name === data.name && tp.id !== id)) {
        throw new ConflictException('Trading point with this name already exists');
      }
    }
    const mutation = `mutation($id: Float!, $data: TradingPointUpdateInput!) {
      updateTradingPoint(id: $id, data: $data) {
        id name type address sizeSqm rentCost utilityCost counterCount floorsCount openingDate active
      }
    }`;
    const variables = { id, data };
    const result = await this.graphqlRequest<{ updateTradingPoint: any }>(mutation, variables);
    return result.updateTradingPoint;
  }

  async remove(id: number): Promise<void> {
    const mutation = `mutation($id: Float!) { deleteTradingPoint(id: $id) }`;
    await this.graphqlRequest<void>(mutation, { id });
  }
}

