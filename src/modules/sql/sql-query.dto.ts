import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SqlQueryDto {
    @ApiProperty({ description: 'SQL query to execute', example: 'SELECT * FROM users;' })
    @IsString()
    query!: string;
}

