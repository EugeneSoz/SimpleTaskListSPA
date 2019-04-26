"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nameHelper_1 = require("../../helpers/nameHelper");
var entityType_1 = require("../../enums/entityType");
var errorAttributes_1 = require("../../enums/errorAttributes");
var ModelErrors = /** @class */ (function () {
    function ModelErrors() {
        this._nh = new nameHelper_1.NameHelper();
    }
    ModelErrors.prototype.getValidationErrors = function (entityType, property, errorName) {
        switch (entityType) {
            case entityType_1.EntityType.TaskItem:
                return this.getTaskItemErrors(property, errorName);
            case entityType_1.EntityType.Category:
                return this.getCategoryErrors(property, errorName);
        }
    };
    ModelErrors.prototype.getTaskItemErrors = function (property, errorName) {
        var msg = null;
        if (property == this._nh.nameof("name")
            && errorName == errorAttributes_1.ErrorAttributes.required) {
            msg = "Укажите название";
        }
        else if (property == this._nh.nameof("name")
            && errorName == errorAttributes_1.ErrorAttributes.range) {
            msg = "Название должно быть от 3 до 60 символов";
        }
        else if (property == this._nh.nameof("planningDate")
            && errorName == errorAttributes_1.ErrorAttributes.required) {
            msg = "Укажите дату в формате чч.мм.гггг";
        }
        else if (property == this._nh.nameof("categoryId")
            && errorName == errorAttributes_1.ErrorAttributes.minValue) {
            msg = "Укажите категорию задачи";
        }
        return msg;
    };
    ModelErrors.prototype.getCategoryErrors = function (property, errorName) {
        var msg = null;
        if (property == this._nh.nameof("name")
            && errorName == errorAttributes_1.ErrorAttributes.required) {
            msg = "Укажите название";
        }
        else if (property == this._nh.nameof("name")
            && errorName == errorAttributes_1.ErrorAttributes.range) {
            msg = "Название должно быть от 3 до 60 символов";
        }
        return msg;
    };
    return ModelErrors;
}());
exports.ModelErrors = ModelErrors;
//# sourceMappingURL=modelErrors.js.map