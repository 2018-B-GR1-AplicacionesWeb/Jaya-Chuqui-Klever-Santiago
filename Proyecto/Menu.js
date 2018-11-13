"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opcionesMenu = [
    'crear',
    'borrar',
    'actualizar',
    'leer'
];
exports.menu = [
    {
        type: 'input',
        name: 'opcionMenuSeleccionado',
        message: 'Escoja Opcion'
    }
];
exports.menu2 = [
    {
        type: 'list',
        name: 'opcionMenuSeleccionado2',
        message: 'Escoja Opcion',
        choices: exports.opcionesMenu
    }
];
