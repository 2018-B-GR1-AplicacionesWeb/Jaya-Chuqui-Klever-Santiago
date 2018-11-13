import {menu2} from "./Menu";

let inquirer = require('inquirer');
let fs = require('fs');

//console.log (menuPrincipal);
inquirer
    .prompt(
        menu2
    )
    .then(
        (respuesta)=>[
            console.log (respuesta)
        ]
    )