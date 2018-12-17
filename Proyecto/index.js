"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var comidas_1 = require("./comidas");
var pedido_1 = require("./pedido");
var inquirer = require('inquirer');
var fechaActual = new Date();
function start() {
    inquirer
        .prompt([
        {
            type: 'list', name: 'Menu', message: 'Seleccione una opcion',
            choices: ['Registrar Comidas', 'Listar Menu del dia', 'Pedido Comida', 'Salir']
        }
    ])
        .then(function (opcionMenu) {
        switch (opcionMenu.Menu) {
            case 'Registrar Comidas':
                console.log('1');
                inquirer.prompt([
                    {
                        type: 'input', name: 'NombreComida', message: 'Ingrese el nombre de la comida'
                    },
                    {
                        type: 'input', name: 'Tipo', message: 'Ingrese el tipo de comida'
                    },
                    {
                        type: 'input', name: 'Servir', message: 'Ingrese opcion de servicio'
                    }
                ])
                    .then(function (agregarPedido) {
                    var respuestasNuevoPedido;
                    var pedidoNuevo = {
                        nombreComida: respuestasNuevoPedido.NombreComida,
                        autor: respuestasNuevoPedido.Tipo,
                        genero: respuestasNuevoPedido.Servir
                    };
                    agregarPedido(null, pedidoNuevo);
                    console.log('comida ingresada con exito.!');
                    start();
                });
                break;
            case 'Listar Pedidos':
                comidas_1.listarComidas();
                start();
                break;
            case 'Pedido Comida':
                comidas_1.listarComidas();
                inquirer.prompt([
                    {
                        type: 'input', name: 'NombreComida', message: 'Ingrese la comida'
                    }
                ])
                    .then(function (respuestasNuevoPedido) {
                    var nuevoPedido = {
                        fecha: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 1) + '/' + fechaActual.getFullYear(),
                        nombreComida: respuestasNuevoPedido.Titulo,
                        fechaEntrega: fechaActual.getDate() + '/' + (fechaActual.getMonth() + 2) + '/' + fechaActual.getFullYear()
                    };
                    pedido_1.crearPedido(pedido_1.pedidoComida, nuevoPedido);
                    console.log('Pedido registrado con exito.!');
                    start();
                });
                break;
            case 'Salir':
                break;
        }
    });
}
start();
