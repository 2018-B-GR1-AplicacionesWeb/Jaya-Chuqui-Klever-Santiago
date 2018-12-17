"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const noticia_service_1 = require("./noticia.service");
let AppController = class AppController {
    constructor(_servicio, _noticiaService) {
        this._servicio = _servicio;
        this._noticiaService = _noticiaService;
    }
    inicio(response, accion, titulo) {
        let mensaje = undefined;
        if (accion && titulo) {
            switch (accion) {
                case 'borrar':
                    mensaje = `Registro ${titulo} eliminado`;
                case 'actualizar':
                    mensaje = `Registro ${titulo} actualizado`;
                case 'crear':
                    mensaje = `Registro ${titulo} creado`;
            }
            console.log(mensaje);
        }
        response.render('inicio', {
            usuario: 'Jonathan',
            arreglo: this._noticiaService.arreglo,
            booleano: false,
            mensaje: mensaje
        });
    }
    eliminar(response, ideNoticia) {
        const noticiaBorrada = this._noticiaService.eliminar(Number(ideNoticia));
        const parametroConsulta = `?accion=borrar&titulo=${noticiaBorrada.titulo}`;
        response.redirect('/inicio' + parametroConsulta);
    }
    crearNoticia(response) {
        response.render('crear-noticia');
    }
    crearNoticiaFuncion(response, noticia) {
        const noticiaCreada = this._noticiaService.crear(noticia);
        const parametroConsulta = `?accion=crear&titulo=${noticiaCreada.titulo}`;
        response.redirect('/inicio' + parametroConsulta);
    }
    actualizarNoticiaVista(response, idNoticia) {
        const noticiaEncontrada = this._noticiaService.buscarPorId(+idNoticia);
        response.render('crear-noticia', {
            noticia: noticiaEncontrada
        });
    }
    actualizarNoticiaMetodo(response, idNoticia, noticia) {
        noticia.id = +idNoticia;
        const noticiaActualizada = this._noticiaService.actulizar(+idNoticia, noticia);
        const parametroConsulta = `?accion=actualizar&titulo=${noticiaActualizada.titulo}`;
        response.redirect('/inicio' + parametroConsulta);
    }
};
__decorate([
    common_1.Get('inicio'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query('accion')),
    __param(2, common_1.Query('titulo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "inicio", null);
__decorate([
    common_1.Post('eliminar/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "eliminar", null);
__decorate([
    common_1.Get('crear-noticia'),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearNoticia", null);
__decorate([
    common_1.Post('crear-noticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "crearNoticiaFuncion", null);
__decorate([
    common_1.Get('actualizar-noticia/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "actualizarNoticiaVista", null);
__decorate([
    common_1.Post('actualizar-noticia/:idNoticia'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('idNoticia')),
    __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "actualizarNoticiaMetodo", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService, typeof (_a = typeof noticia_service_1.NoticiaService !== "undefined" && noticia_service_1.NoticiaService) === "function" ? _a : Object])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map