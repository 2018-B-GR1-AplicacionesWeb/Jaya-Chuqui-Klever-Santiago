"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inquirer = require('inquirer');
var fs = require('fs');
var libroEjemplo = {
    nombreComida: 'libropueba',
    autor: 'anonimo',
    genero: 'comedia'
};
exports.lecturaComidas = new Promise(function (resolve, reject) {
    fs.readFile('listaComidad.json', 'utf-8', function (err, contenidoArchivo) {
        if (err) {
            resolve('');
        }
        else {
            resolve(contenidoArchivo);
        }
    });
});
var escrituraArchivoComidas = function (contenidoLeido, datosComida) {
    return new Promise(function (resolve, reject) {
        var contenido = contenidoLeido ? contenidoLeido + datosComida : datosComida;
        fs.writeFile('listaComidad.json', contenido, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenido);
            }
        });
    });
};
exports.agregarComida = function (arreglosComida, ComidaNuevo) {
    arreglosComida.push(ComidaNuevo);
    return new Promise(function (resolve, reject) {
        var archivo = 'listaComidad.json';
        var datosComida = '\n' + JSON.stringify(ComidaNuevo);
        exports.lecturaComidas
            .then(function (contenidoArchivo) {
            return escrituraArchivoComidas(contenidoArchivo, datosComida);
        });
    });
};
exports.listarComidas = function () {
    return new Promise(function (resolve, reject) {
        exports.lecturaComidas
            .then(function (contenidoArchivo) {
            console.log('\n*****Comidas*****\n', contenidoArchivo);
        });
    });
};
