import { AppService } from './app.service';
import { Observable } from "rxjs";
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    raiz(todosQueryParams: any, nombre: string): string;
    parametroRuta(id: any): any;
    adiosMundo(): string;
    adiosMundoPOST(): string;
    adiosMundoPromesa(): Promise<string>;
    adiosMundoAsync(): Promise<string>;
    adiosMundoObservable(): Observable<string>;
}
