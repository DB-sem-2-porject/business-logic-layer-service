import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SqlController } from './sql.controller.ts';
import { SqlService } from './sql.service.ts';

@Module({
    imports: [HttpModule],
    controllers: [SqlController],
    providers: [SqlService],
})
export class SqlModule {}

