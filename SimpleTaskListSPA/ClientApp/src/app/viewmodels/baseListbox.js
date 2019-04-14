"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseListBoxComponent = /** @class */ (function () {
    function BaseListBoxComponent(_taskService) {
        this._taskService = _taskService;
    }
    BaseListBoxComponent.prototype.ngOnInit = function () {
        this._taskService.recieveTasks();
    };
    return BaseListBoxComponent;
}());
exports.BaseListBoxComponent = BaseListBoxComponent;
//# sourceMappingURL=baseListbox.js.map