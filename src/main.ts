import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app-module';
import axios from 'axios';
import * as Entities from 'database-entity-service-lib';
import { TypeOrmModuleOptions } from 'typeorm';

const allEntities = Object.values(Entities).filter(
    (entity: any) => typeof entity === 'function' && entity.name && entity.prototype && entity.prototype.constructor
);

async function getDbConfig(): Promise<TypeOrmModuleOptions> {
    const response = await axios.get('http://localhost:40001/internal/data-source', {
        headers: { 'service-token': process.env.INTERNAL_SERVICE_TOKEN || 'default-token' },
    });
    // Remove properties that are not part of TypeOrmModuleOptions
    const { options, ...rest } = response.data;
    return {
        ...(options || rest),
        entities: allEntities,
    };
}

async function bootstrap() {
    const dbConfig = await getDbConfig();
    const app = await NestFactory.create(AppModule.forRoot(dbConfig), {
        bufferLogs: true,
    });
    app.useLogger(app.get('Logger'));
    app.setGlobalPrefix('api');
    app.enableCors();

    const config = new DocumentBuilder()
        .setTitle('Business Logic API')
        .setDescription('API для работы с бизнес-логикой')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

bootstrap().catch((err) => {
    console.error('NestJS bootstrap error:', err);
    process.exit(1);
});
