"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nameHelper_1 = require("../helpers/nameHelper");
//класс содержит элементы списка в панели Toolbar
var ListItem = /** @class */ (function () {
    function ListItem(propertyName, name, href, hasDivider) {
        this.propertyName = propertyName;
        this.name = name;
        this.href = href;
        this.hasDivider = hasDivider;
    }
    return ListItem;
}());
exports.ListItem = ListItem;
var DropdownList = /** @class */ (function () {
    function DropdownList() {
    }
    DropdownList.prototype.createSortingList = function (href) {
        var nh = new nameHelper_1.NameHelper();
        this.listItems = new Array(new ListItem("", "Сортировать по", href, false), new ListItem("desc", "По алфавиту", href, true), new ListItem(nh.nameof("name"), "Названию", href, false), new ListItem(nh.nameof("creationDate"), "Дате создания", href, false), new ListItem(nh.nameof("planningDate"), "Дате выполнения", href, false), new ListItem(nh.nameof("isImportant"), "Важности", href, false));
    };
    return DropdownList;
}());
exports.DropdownList = DropdownList;
//# sourceMappingURL=dropdownlist.js.map