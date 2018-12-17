
declare var require;
const inquirer = require('inquirer');
const fs = require('fs');

declare var Promise:any;

export interface InterfacePedido {
    nombreComida: string;
    autor: string;
    genero: string;
}

const libroEjemplo: InterfacePedido = {
    nombreComida:'libropueba',
    autor:'anonimo',
    genero:'comedia'
};


export const lecturaComidas = new Promise(
    (resolve, reject) => {
        fs.readFile('listaComidad.json','utf-8',
            (err, contenidoArchivo)=>{
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

const escrituraArchivoComidas = (contenidoLeido:string, datosComida:string) => {
    return new Promise(
        (resolve, reject) => {
            const  contenido = contenidoLeido ? contenidoLeido + datosComida: datosComida;
            fs.writeFile('listaComidad.json', contenido,
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

export const agregarComida = (arreglosComida, ComidaNuevo) =>{
    arreglosComida.push(ComidaNuevo);
    return new Promise(
        (resolve, reject) => {
            const archivo:string = 'listaComidad.json';
            const datosComida:string = '\n' + JSON.stringify(ComidaNuevo);
            lecturaComidas
                .then(
                    (contenidoArchivo)=>{
                        return escrituraArchivoComidas(contenidoArchivo,datosComida);
                    }
                )
        }
    )
};

export const listarComidas = () =>{
    return new Promise(
        (resolve, reject) => {
            lecturaComidas
                .then(
                    (contenidoArchivo)=>{
                        console.log('\n*****Comidas*****\n', contenidoArchivo);
                    }
                )
        }
    )
};
