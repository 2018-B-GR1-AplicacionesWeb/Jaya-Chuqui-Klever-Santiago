export const opcionesMenu=
    [
        'crear',
        'borrar',
        'actualizar',
        'leer'
    ]
export const menu=[
    {
        type:'input',
        name:'opcionMenuSeleccionado',
        message: 'Escoja Opcion'
    }
]
export const menu2=[
    {
        type:'list',
        name:'opcionMenuSeleccionado2',
        message: 'Escoja Opcion',
        choices: opcionesMenu
    }
]