"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Menu_1 = require("./Menu");
var inquirer = require('inquirer');
var fs = require('fs');
//console.log (menuPrincipal);
inquirer
    .prompt(Menu_1.menu2)
    .then(function (respuesta) { return [
    console.log(respuesta)
]; });
