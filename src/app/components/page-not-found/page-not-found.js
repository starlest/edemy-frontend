"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var layout = require('../../actions/layout');
var PageNotFoundComponent = (function () {
    function PageNotFoundComponent(store) {
        this.store = store;
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
        this.store.dispatch(new layout.ChangeTitleAction('PAGE NOT FOUND'));
    };
    PageNotFoundComponent = __decorate([
        core_1.Component({
            selector: "ed-page-not-found",
            template: "\n      <h1 class=\"error\">\n        ERROR 404: Ooops... There is nothing here! <i class=\"fa fa-frown-o\"\n                                           aria-hidden=\"true\"></i>\n      </h1>\n",
            styles: [
                "\n      .error {\n          text-align: center;\n          margin-top: 50px;\n      }\n"
            ]
        })
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());
exports.PageNotFoundComponent = PageNotFoundComponent;
