import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app-module.ts';
import {readFileSync} from "node:fs";



async function bootstrap() {
    let serviceConfigFileContent = readFileSync('./configs/service-config.json', 'utf8');
    let serviceConfig = JSON.parse(serviceConfigFileContent);
    const port = serviceConfig.port;
    try {

        console.log('DataSource initialized successfully');
        const app = await NestFactory.create(AppModule);

        // app.useLogger(app.get('Logger'));
        app.setGlobalPrefix('api');
        app.enableCors();

        const config = new DocumentBuilder()
            .setTitle('Business Logic API')
            .setDescription('API для работы с бизнес-логикой')
            .setVersion('1.0')
            .build();

        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api', app, document);

        await app.listen(port);
        console.log('Business logic service is running on port', port);

    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}

bootstrap().catch((err) => {
    console.error('NestJS bootstrap error:', err);
    process.exit(1);
});
