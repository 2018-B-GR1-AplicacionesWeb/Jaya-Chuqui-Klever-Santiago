import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NoticiaService} from "./noticia.service";

@Module({
    imports: [],  //Van los modulos
    controllers: [AppController],  //Van los COntrollers
    providers: [AppService, NoticiaService],      // Van los Servicios
})
export class AppModule {}