import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {} from 'http-server'  //EN Typescript para importar
import * as cookieParser from 'cookie-parser'
import * as ejs from 'ejs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser(
        'me gustan los tacos', // secreto
        {  // opciones

        }
    ));
    app.set('view engine', 'ejs');

    await app.listen(3000);
}
bootstrap();