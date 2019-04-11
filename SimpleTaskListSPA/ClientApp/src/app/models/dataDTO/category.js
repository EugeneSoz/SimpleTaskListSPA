"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category = /** @class */ (function () {
    function Category(id, name, taskItems) {
        if (id === void 0) { id = 0; }
        if (name === void 0) { name = ""; }
        if (taskItems === void 0) { taskItems = null; }
        this.id = id;
        this.name = name;
        this.taskItems = taskItems;
    }
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map