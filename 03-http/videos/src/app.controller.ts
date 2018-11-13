import {Get, Controller, HttpCode, InternalServerErrorException, Post, Query, Param} from '@nestjs/common';
import {AppService} from './app.service';
import {Observable, of} from "rxjs";

@Controller()  //decoradores
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get() // http://ip:puerto
    @HttpCode(204) // status
    raiz(
        @Query() todosQueryParams: any,
        @Query('nombre') nombre: string,
    ): string {
        console.log(todosQueryParams);
        return 'Hola Mundo' + nombre;
    }

    @Get('segmentoUno/segmentoDos/:idUsuario')
    parametroRuta(
        @Param('idUsuario') id
    ) {
        return id;
    }

    @Get('adiosMundo') // url
    adiosMundo(): string {
        return 'Adios Mundo';
    }

    @Post('adiosMundo') // url
    adiosMundoPOST(): string {
        return 'Adios Mundo POST';
    }

    @Get('adiosMundoPromesa') // url
    adiosMundoPromesa(): Promise<string> {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve) => {
                    resolve('Adios Mundo');
                }
            )
        };
        return promesaAdios();
    }


    @Get('adiosMundoAsync') // url
    @HttpCode(201)
    async adiosMundoAsync() {
        const promesaAdios = (): Promise<string> => {
            return new Promise(
                (resolve, reject) => {
                    reject('Adios Mundo');
                }
            )
        };
        try {
            const respuesta: string = await promesaAdios();
            return respuesta;
        } catch (e) {
            console.error(e);
            throw new InternalServerErrorException({mensaje: 'Error servidor'})
        }

    }

    @Get('adiosMundoObservable') // url
    adiosMundoObservable(): Observable<string> {
        const respuesta$ = of('Adios Mundo');
        return respuesta$;
    }


}
