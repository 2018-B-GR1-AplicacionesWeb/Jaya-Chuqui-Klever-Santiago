"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var fechaActual = new Date();
exports.pedidoComida = [];
var prestamoejm = {
    fecha: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 1) + '/' + fechaActual.getFullYear(),
    nombreComida: 'Chaulafan',
    fechaEntrega: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 2) + '/' + fechaActual.getFullYear()
};
exports.lecturaArchivoPedidos = new Promise(function (resolve, reject) {
    fs.readFile('pedido.json', 'utf-8', function (err, contenidoArchivo) {
        if (err) {
            resolve('');
        }
        else {
            resolve(contenidoArchivo);
        }
    });
});
var escrituraArchivoPedidos = function (contenidoLeido, datosComida) {
    return new Promise(function (resolve, reject) {
        var contenido = contenidoLeido ? contenidoLeido + datosComida : datosComida;
        fs.writeFile('pedido.json', contenido, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(contenido);
            }
        });
    });
};
exports.crearPedido = function (arreglosPedido, nuevoPedido) {
    arreglosPedido.push(nuevoPedido);
    return new Promise(function (resolve, reject) {
        var archivo = 'pedido.json';
        var datosPedido = '\n' + JSON.stringify(nuevoPedido);
        exports.lecturaArchivoPedidos
            .then(function (contenidoArchivo) {
            return escrituraArchivoPedidos(contenidoArchivo, datosPedido);
        });
    });
};
