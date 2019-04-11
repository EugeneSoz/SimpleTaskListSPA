"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MigrationsOptions = /** @class */ (function () {
    function MigrationsOptions(tasksCount, categoriesCount, contextNames, appliedMigrations, pendingMigrations, allMigrations, infoMessage) {
        if (tasksCount === void 0) { tasksCount = 0; }
        if (categoriesCount === void 0) { categoriesCount = 0; }
        if (contextNames === void 0) { contextNames = new Array(); }
        if (appliedMigrations === void 0) { appliedMigrations = new Array(); }
        if (pendingMigrations === void 0) { pendingMigrations = new Array(); }
        if (allMigrations === void 0) { allMigrations = new Array(); }
        if (infoMessage === void 0) { infoMessage = ""; }
        this.tasksCount = tasksCount;
        this.categoriesCount = categoriesCount;
        this.contextNames = contextNames;
        this.appliedMigrations = appliedMigrations;
        this.pendingMigrations = pendingMigrations;
        this.allMigrations = allMigrations;
        this.infoMessage = infoMessage;
    }
    return MigrationsOptions;
}());
exports.MigrationsOptions = MigrationsOptions;
//# sourceMappingURL=migrationsOptions.js.map