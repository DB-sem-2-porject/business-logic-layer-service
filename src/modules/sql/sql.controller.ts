import { Body, Controller, Post } from '@nestjs/common';
import { SqlService } from './sql.service.ts';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { SqlQueryDto } from './sql-query.dto.ts';

@ApiTags('SQL')
@Controller('sql')
export class SqlController {
    constructor(private readonly sqlService: SqlService) {}

    @Post('execute')
    @ApiBody({ type: SqlQueryDto })
    @ApiOperation({ summary: 'Execute SQL query' })
    @ApiResponse({ status: 200, description: 'Query executed successfully' })
    async executeSql(@Body() body: SqlQueryDto) {
        return this.sqlService.executeQuery(body.query);
    }
}
