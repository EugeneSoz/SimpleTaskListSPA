"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TaskItem = /** @class */ (function () {
    function TaskItem(id, name, creationDate, planningDate, effectiveDate, isPlanningDateUsed, isCompleted, isOverdue, isImportant, category, categoryId) {
        if (id === void 0) { id = 0; }
        if (name === void 0) { name = ""; }
        if (creationDate === void 0) { creationDate = null; }
        if (planningDate === void 0) { planningDate = null; }
        if (effectiveDate === void 0) { effectiveDate = null; }
        if (isPlanningDateUsed === void 0) { isPlanningDateUsed = false; }
        if (isCompleted === void 0) { isCompleted = false; }
        if (isOverdue === void 0) { isOverdue = false; }
        if (isImportant === void 0) { isImportant = false; }
        if (category === void 0) { category = null; }
        if (categoryId === void 0) { categoryId = 0; }
        this.id = id;
        this.name = name;
        this.creationDate = creationDate;
        this.planningDate = planningDate;
        this.effectiveDate = effectiveDate;
        this.isPlanningDateUsed = isPlanningDateUsed;
        this.isCompleted = isCompleted;
        this.isOverdue = isOverdue;
        this.isImportant = isImportant;
        this.category = category;
        this.categoryId = categoryId;
    }
    return TaskItem;
}());
exports.TaskItem = TaskItem;
//# sourceMappingURL=taskItem.js.map