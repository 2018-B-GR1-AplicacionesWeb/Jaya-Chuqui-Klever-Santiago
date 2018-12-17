declare var require: any;
// declare var require: require;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;

const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que desea hacer.... ?',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
        'Salir'
    ]
};

const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese Codigo de las comida',
    }
];

const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es el codigo de la comida?'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nombre de la comida?'
    },
    {
        type: 'input',
        name: 'precio',
        message: 'Cual es el precio?'
    },


];

const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre de la comidano'
    },
];


function inicialiarBDD() {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.readFile('bdd.json', 'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {
                        fs.writeFile('bdd.json', '{"usuarios":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"usuarios":[]}')
                                    })
                                }
                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );
}

// @ts-ignore
async function main() {
    // of(Cualquier cosa JS)
    // from(Promesas)
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                //
                console.log(data);
            },
            (error) => {
                //
                console.log(error);
            },
            () => {
                main();
                console.log('Complete');
            }
        )

}

function guardarBDD(bdd: BDD) {
    // @ts-ignore
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}


main();


function preguntarOpcionesMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {

            return rxjs
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                        }
                    )
                );

            // OBSERVABLE!!!!!!!!!!
        }
    )
}

function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))
                        .pipe(
                            map(
                                (comida: Comidas) => { // resp ant OBS
                                    respuestaBDD.comida = comida;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':
                    return consultarid(respuestaBDD);
                case 'Actualizar':
                    return preguntarIdUsuario(respuestaBDD);
                case 'Borrar':
                    return consultarid(respuestaBDD);
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const comida = respuestaBDD.comida;
                    respuestaBDD.bdd.usuarios.push(comida);
                    return respuestaBDD;
                case 'Actualizar':
                    const indiceActualizar = respuestaBDD.indiceUsuario;
                    if (indiceActualizar===-1) {
                        console.error('Error no existe ese producto en bodega para Actulizar !')
                    } else {
                        respuestaBDD.bdd.usuarios[indiceActualizar].nombre = respuestaBDD.comida.nombre;
                        console.log('Producto Actulizado con exito');
                    }
                    return respuestaBDD;

                case 'Buscar':
                    const indiceBuscar = respuestaBDD.indiceUsuario;
                    if (indiceBuscar === -1) {
                        console.error('Error no existe ese producto en bodega')
                    } else {
                        console.log('Zapatillas encontradas : ', respuestaBDD.bdd.usuarios[indiceBuscar])
                    }
                    return respuestaBDD;
                case 'Borrar':
                    const indiceBorrar = respuestaBDD.indiceUsuario;
                    if (indiceBorrar === -1) {
                        console.error('Error No existe registro')
                    } else {
                        console.log('Zapatillas borradas de registro !!', respuestaBDD.bdd.usuarios[indiceBorrar]);
                        const a = respuestaBDD.bdd.usuarios
                        a.splice(respuestaBDD.bdd.usuarios[indiceBorrar], 1)
                    }
                    return respuestaBDD;
            }
        }
    )
}

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    comida?: Comidas;
    indiceUsuario?: number;
}

interface BDD {
    usuarios: Comidas[] | any;

}


interface Comidas {
    id: number;
    nombre: string;
    precio: number;
}


interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: string;
}

function preguntarIdUsuario(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (comida: any) => {
                                return comida.id === respuesta.idUsuario
                            }
                        );
                    if (indiceUsuario === -1) {
                        console.log('Preguntando de nuevo registro no encontrado, no existe');
                        return preguntarIdUsuario(respuestaBDD);
                    } else {
                        respuestaBDD.indiceUsuario = indiceUsuario;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionUsuario))
                            .pipe(
                                map(
                                    (nombre: { nombre: string }) => {
                                        respuestaBDD.comida = {
                                            id: null,
                                            nombre: nombre.nombre,
                                            precio: null
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );

                    }

                }
            )
        );
}

function consultarid(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            map( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (comida: any) => {

                                return comida.id === respuesta.idUsuario

                            }
                        );

                    respuestaBDD.indiceUsuario = indiceUsuario;

                    return respuestaBDD;


                }
            )
        );
}