"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QueryOptions = /** @class */ (function () {
    function QueryOptions(sortPropertyName, descendingOrder, searchPropertyNames, searchTerm, selectedCategoryId) {
        this.sortPropertyName = sortPropertyName;
        this.descendingOrder = descendingOrder;
        this.searchPropertyNames = searchPropertyNames;
        this.searchTerm = searchTerm;
        this.selectedCategoryId = selectedCategoryId;
    }
    QueryOptions.prototype.resetToDefault = function () {
        this.sortPropertyName = "";
        this.descendingOrder = false;
        this.searchPropertyNames = null;
        this.searchTerm = "";
        this.selectedCategoryId = null;
    };
    return QueryOptions;
}());
exports.QueryOptions = QueryOptions;
//# sourceMappingURL=queryOptions.js.map