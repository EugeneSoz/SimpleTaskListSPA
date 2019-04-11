"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var category_1 = require("./category");
var CategoryResponse = /** @class */ (function (_super) {
    __extends(CategoryResponse, _super);
    function CategoryResponse(overdueTasksCount, allTasksCount) {
        if (overdueTasksCount === void 0) { overdueTasksCount = 0; }
        if (allTasksCount === void 0) { allTasksCount = 0; }
        var _this = _super.call(this) || this;
        _this.overdueTasksCount = overdueTasksCount;
        _this.allTasksCount = allTasksCount;
        return _this;
    }
    return CategoryResponse;
}(category_1.Category));
exports.CategoryResponse = CategoryResponse;
//# sourceMappingURL=categoryResponse.js.map