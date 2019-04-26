"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorAttributes_1 = require("../enums/errorAttributes");
var BaseFormComponent = /** @class */ (function () {
    function BaseFormComponent(modelErrors, entityType) {
        this._modelErrors = modelErrors;
        this._entityType = entityType;
    }
    BaseFormComponent.prototype.getErrors = function (control, property) {
        if (control.dirty && control.invalid) {
            return this.getValidationMessages(control, property);
        }
        else {
            return null;
        }
    };
    BaseFormComponent.prototype.getValidationMessages = function (control, property) {
        var messages = new Array();
        if (control.errors) {
            for (var errorName in control.errors) {
                switch (errorName) {
                    case errorAttributes_1.ErrorAttributes.required:
                        messages.push(this._modelErrors.getValidationErrors(this._entityType, property, errorName));
                        break;
                    case errorAttributes_1.ErrorAttributes.range:
                        messages.push(this._modelErrors.getValidationErrors(this._entityType, property, errorName));
                        break;
                    case errorAttributes_1.ErrorAttributes.minValue:
                        messages.push(this._modelErrors.getValidationErrors(this._entityType, property, errorName));
                        break;
                }
            }
        }
        return messages;
    };
    return BaseFormComponent;
}());
exports.BaseFormComponent = BaseFormComponent;
//# sourceMappingURL=baseForm.js.map