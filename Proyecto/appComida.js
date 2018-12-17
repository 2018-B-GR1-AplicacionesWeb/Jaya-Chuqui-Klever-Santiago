var inquirer = require('inquirer');
var comidas = require('./Menu');
var fs = require('fs');
//console.log (menuPrincipal);
inquirer
    .prompt(comidas)
    .then(function (respuesta) { return [
    console.log(respuesta)
]; });
