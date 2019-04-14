"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CategoryEventArgs = /** @class */ (function () {
    function CategoryEventArgs(selectedCategoryId, searchTerm) {
        this.selectedCategoryId = selectedCategoryId;
        this.searchTerm = searchTerm;
    }
    return CategoryEventArgs;
}());
exports.CategoryEventArgs = CategoryEventArgs;
exports.Category_Changed = new core_1.InjectionToken("");
//# sourceMappingURL=categoryEventArgs.js.map