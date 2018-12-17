
import {agregarComida, lecturaComidas, InterfacePedido, listarComidas} from "./comidas";
import {crearPedido, pedidoInterface, pedidoComida} from "./pedido";

declare var require;
const inquirer = require('inquirer');

const fechaActual = new Date();

function start() {
    inquirer
        .prompt([
            {
                type: 'list', name: 'Menu', message: 'Seleccione una opcion',
                choices: ['Registrar Comidas', 'Listar Menu del dia', 'Pedido Comida', 'Salir']
            }
        ])
        .then(opcionMenu => {
            switch (opcionMenu.Menu) {
                case 'Registrar Comidas':
                    console.log('1');
                    inquirer.prompt([
                        {
                            type: 'input', name: 'NombreComida', message: 'Ingrese el nombre de la comida'},
                        {
                            type: 'input', name: 'Tipo', message: 'Ingrese el tipo de comida'},
                        {
                            type: 'input', name: 'Servir', message: 'Ingrese opcion de servicio'}
                    ])
                        .then(agregarPedido => {
                            var respuestasNuevoPedido;
                            const pedidoNuevo: InterfacePedido = {
                                nombreComida: respuestasNuevoPedido.NombreComida,
                                autor: respuestasNuevoPedido.Tipo,
                                genero: respuestasNuevoPedido.Servir
                            };
                            agregarPedido(null,pedidoNuevo);
                            console.log('comida ingresada con exito.!');
                            start();
                        });
                    break;
                case 'Listar Pedidos':
                    listarComidas();
                    start();
                    break;
                case 'Pedido Comida':
                    listarComidas();

                    inquirer.prompt([
                        {
                            type: 'input', name: 'NombreComida', message: 'Ingrese la comida'}
                    ])
                        .then(respuestasNuevoPedido=> {
                            const nuevoPedido: pedidoInterface = {
                                fecha: fechaActual.getDate()+'/'+(fechaActual.getMonth()+1)+'/'+fechaActual.getFullYear(),
                                nombreComida: respuestasNuevoPedido.Titulo,
                                fechaEntrega: fechaActual.getDate()+'/'+(fechaActual.getMonth()+2)+'/'+fechaActual.getFullYear()
                            };
                            crearPedido(pedidoComida, nuevoPedido);
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