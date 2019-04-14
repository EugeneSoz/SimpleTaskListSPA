"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var categoryFilterType_1 = require("../enums/categoryFilterType");
var DisplayedCategory = /** @class */ (function () {
    function DisplayedCategory(category) {
        this.category = null;
        this.iconColour = null;
        this.iconSymbol = null;
        this.category = category;
        this.setSymbol(category);
        this.setColour(category);
    }
    DisplayedCategory.prototype.setSymbol = function (category) {
        switch (category.id) {
            case 1:
                this.iconSymbol = "<i class='fas fa-inbox'></i>";
                break;
            case categoryFilterType_1.CategoryFilterType.starred:
                this.iconSymbol = "<i class='fas fa-star'></i>";
                break;
            case categoryFilterType_1.CategoryFilterType.today:
                this.iconSymbol = "<i class='fas fa-calendar-minus'></i>";
                break;
            case categoryFilterType_1.CategoryFilterType.week:
                this.iconSymbol = "<i class='fas fa-calendar-minus'></i>";
                break;
            default:
                this.iconSymbol = "<i class='fas fa-align-justify'></i>";
                break;
        }
    };
    DisplayedCategory.prototype.setColour = function (category) {
        switch (category.id) {
            case 1:
                this.iconColour = "#2b8dec";
                break;
            case categoryFilterType_1.CategoryFilterType.starred:
                this.iconColour = "#db4c3f";
                break;
            case categoryFilterType_1.CategoryFilterType.today:
                this.iconColour = "#5fa004";
                break;
            case categoryFilterType_1.CategoryFilterType.week:
                this.iconColour = "#e29600";
                break;
            default:
                this.iconColour = "#b9b9b9";
                break;
        }
    };
    return DisplayedCategory;
}());
exports.DisplayedCategory = DisplayedCategory;
//# sourceMappingURL=displayedCategory.js.map