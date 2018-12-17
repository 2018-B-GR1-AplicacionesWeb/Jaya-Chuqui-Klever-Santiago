import { AppService } from './app.service';
import { NoticiaService } from "./noticia.service";
export declare class AppController {
    private readonly _servicio;
    private readonly _noticiaService;
    constructor(_servicio: AppService, _noticiaService: NoticiaService);
    inicio(response: any, accion: string, titulo: string): void;
    eliminar(response: any, ideNoticia: string): void;
    crearNoticia(response: any): void;
    crearNoticiaFuncion(response: any, noticia: Noticia): void;
    actualizarNoticiaVista(response: any, idNoticia: string): void;
    actualizarNoticiaMetodo(response: any, idNoticia: string, noticia: Noticia): void;
}
export interface Usuario {
    nombre: string;
}
export interface Noticia {
    id?: number;
    titulo: string;
    descripcion: string;
}
