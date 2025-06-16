import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SqlService {
    private readonly restEndpoint = process.env.DATABASE_ACCESS_SERVICE_REST || 'http://localhost:40002/sql/query';

    constructor(private readonly httpService: HttpService) {}

    async executeQuery(query: string): Promise<any> {
        const response$ = this.httpService.post(this.restEndpoint, { query });
        const response = await firstValueFrom(response$);
        return response.data;
    }
}

