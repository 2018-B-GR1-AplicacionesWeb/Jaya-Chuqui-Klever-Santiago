import {lecturaComidas} from "./comidas";

declare var require;
const fs = require('fs');

declare var Promise:any;
const fechaActual = new Date();

export const pedidoComida: any = [];

export interface pedidoInterface{
    fecha: string;
    nombreComida: string;
    fechaEntrega: string;
}

const prestamoejm:pedidoInterface = {
    fecha: fechaActual.getDate()+'/'+(fechaActual.getMonth()+1)+'/'+fechaActual.getFullYear(),
    nombreComida: 'Chaulafan',
    fechaEntrega: fechaActual.getDate()+'/'+(fechaActual.getMonth()+2)+'/'+fechaActual.getFullYear()
};

export const lecturaArchivoPedidos = new Promise(
    (resolve, reject) => {
        fs.readFile('pedido.json','utf-8',
            (err, contenidoArchivo)=>{
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

const escrituraArchivoPedidos = (contenidoLeido:string, datosComida:string) => {
    return new Promise(
        (resolve, reject) => {
            const  contenido = contenidoLeido ? contenidoLeido + datosComida: datosComida;
            fs.writeFile('pedido.json', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(contenido);
                    }
                });
        }
    );
};

export const crearPedido = (arreglosPedido, nuevoPedido) =>{
    arreglosPedido.push(nuevoPedido);
    return new Promise(
        (resolve, reject) => {
            const archivo:string = 'pedido.json';
            const datosPedido:string = '\n' + JSON.stringify(nuevoPedido);
            lecturaArchivoPedidos
                .then(
                    (contenidoArchivo)=>{
                        return escrituraArchivoPedidos(contenidoArchivo,datosPedido);
                    }
                )

        }
    )
};
