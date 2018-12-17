const inquirer = require('inquirer');
const comidas=require ('./Menu');
let fs = require('fs');

//console.log (menuPrincipal);
inquirer
    .prompt(
        comidas
    )
    .then(
        (respuesta)=>[
            console.log (respuesta)
        ]
    )