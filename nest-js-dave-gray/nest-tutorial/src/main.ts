import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './all-exceptions.filter';
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    //* Using our custom logger
    // const app = await NestFactory.create(AppModule, {
    //     bufferLogs: true,
    // });

    // app.useLogger(app.get(MyLoggerService)); // using our logger service

    app.enableCors(); // enables api for everyone

    app.setGlobalPrefix('api'); // adds a /api prefix for requests

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
